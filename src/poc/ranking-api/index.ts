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
                zoomLevel: null,
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

    async getLatestRankings(id: number) {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);

        const fromDate = lastWeek.toISOString().split('T')[0];
        const untilDate = today.toISOString().split('T')[0];

        return this.getRankings(id, fromDate, untilDate);
    }
}