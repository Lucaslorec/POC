import rebelInternetClient from './clients/rebel-internet';

export interface TrackingParams {
    propertyUid: string;
    dateType: 'any-weekend' | 'any-week' | string;
    domain: string;
    adults: number;
    location: {
        neLat: number | null;
        neLng: number | null;
        swLat: number | null;
        swLng: number | null;
        zoomLevel: number | null;
        query: string;
    };
}

export interface RankingParams {
    id: number;
    from: string;
    until: string;
}

export class rankingApi {
    private client: rebelInternetClient;

    constructor() {
        this.client = rebelInternetClient.factory();
    }

    async track(params: TrackingParams) {
        const response = await this.client.track(params);
        return response.data;
    }

    async trackProperty(
        propertyUid: string,
        location: string,
        adults: number = 2,
        dateType: 'any-weekend' | 'any-week' = 'any-week',
        domain: string = 'com'
    ) {
        return this.track({
            propertyUid,
            dateType,
            domain,
            adults,
            location: {
                neLat: null,
                neLng: null,
                swLat: null,
                swLng: null,
                zoomLevel: 12.5,
                query: location
            }
        });
    }

    async getRankings(id: number, from: string, until: string) {
        const response = await this.client.getRankingResults({
            id,
            from,
            until
        });
        return response;
    }

    async getLatestRankings(queryId: number) {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        const fromDate = lastWeek.toISOString().split('T')[0];
        const untilDate = today.toISOString().split('T')[0];

        return this.getRankings(queryId, fromDate, untilDate);
    }
}

// Example usage
if (require.main === module) {
    (async () => {
        try {
            // Create an instance of the API
            const api = new rankingApi();

            // Query rankings with ID 31 and specified date range
            console.log('Fetching rankings for query ID 31...');
            const rankings = await api.getRankings(31, '2025-05-09', '2025-05-18');

            // Display the results
            console.log('Rankings found:', rankings.data);

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching rankings:', error.message);
            } else {
                console.error('Error fetching rankings:', error);
            }
        }
    })();
}