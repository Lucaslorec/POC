import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '../config';
import { QueryCreationResponse, QueryResult, RankingQuery } from '../models/types';
import { withRetry } from '../utils/retries';

export interface IRankingClient {
    createQuery(query: RankingQuery): Promise<QueryCreationResponse>;
    getQueryResults(queryId: string, page?: number, pageSize?: number): Promise<QueryResult>;
    listQueries(): Promise<QueryCreationResponse[]>;
}

export class RankingClient implements IRankingClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: config.dataSourceUrl,
            timeout: config.requestTimeoutMs,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': `${config.apiKey}`
            }
        });

    }

    async createQuery(query: RankingQuery): Promise<QueryCreationResponse> {
        try {
            return await withRetry(async () => {
                const response = await this.axiosInstance.post<QueryCreationResponse>('/query', query);
                return response.data;
            });
        } catch (error) {
            console.error('Error creating query:', error);
            throw error;
        }
    }

    async getQueryResults(queryId: string, page?: number, pageSize?: number): Promise<QueryResult> {
        try {
            const params: Record<string, any> = {};
            if (page !== undefined) params.page = page;
            if (pageSize !== undefined) params.pageSize = pageSize;

            return await withRetry(async () => {
                const response = await this.axiosInstance.get<QueryResult>(`/query/${queryId}`, { params });
                return response.data;
            });
        } catch (error) {
            console.error(`Error getting results for query ${queryId}:`, error);
            throw error;
        }
    }

    async listQueries(): Promise<QueryCreationResponse[]> {
        try {
            return await withRetry(async () => {
                const response = await this.axiosInstance.get<QueryCreationResponse[]>('/query');
                return response.data;
            });
        } catch (error) {
            console.error('Error listing queries:', error);
            throw error;
        }
    }
}

// Factory function to create a RankingClient instance
export function createRankingClient(): IRankingClient {
    return new RankingClient();
}
