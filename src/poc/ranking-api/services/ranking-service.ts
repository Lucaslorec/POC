import { IRankingClient, createRankingClient } from '../client/ranking-client';
import { QueryCreationResponse, QueryResult, RankingQuery } from '../models/types';

export interface IRankingService {
    trackRankings(location: string, checkin: string, checkout: string, 
                  adults?: number, children?: number, infants?: number): Promise<QueryCreationResponse>;
    getRankingResults(queryId: string, page?: number, pageSize?: number): Promise<QueryResult>;
    getActiveQueries(): Promise<QueryCreationResponse[]>;
    transformResults(results: QueryResult): Array<{ id: string, name: string, position: number, score: number }>;
}

export class RankingService implements IRankingService {
    private client: IRankingClient;

    constructor(client?: IRankingClient) {
        this.client = client || createRankingClient();
    }

    async trackRankings(location: string, checkin: string, checkout: string,
                       adults: number = 2, children: number = 0, infants: number = 0): Promise<QueryCreationResponse> {
        const query: RankingQuery = {
            location,
            checkin,
            checkout,
            adults,
            children,
            infants
        };

        return this.client.createQuery(query);
    }

    async getRankingResults(queryId: string, page?: number, pageSize?: number): Promise<QueryResult> {
        return this.client.getQueryResults(queryId, page, pageSize);
    }

    async getActiveQueries(): Promise<QueryCreationResponse[]> {
        return this.client.listQueries();
    }

    transformResults(results: QueryResult): Array<{ id: string, name: string, position: number, score: number }> {
        if (!results.listings) {
            return [];
        }

        return results.listings.map(listing => {
            const positionScore = Math.max(100 - listing.position, 0);
            const ratingScore = listing.rating ? (listing.rating.average * 10) : 0;
            const totalScore = Math.round(positionScore * 0.7 + ratingScore * 0.3);

            return {
                id: listing.id,
                name: listing.name,
                position: listing.position,
                score: totalScore
            };
        });
    }
}

// Factory function to create a RankingService instance
export function createRankingService(client?: IRankingClient): IRankingService {
    return new RankingService(client);
}
