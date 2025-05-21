import axios from 'axios';
import { config } from '../config';



class rebelInternetClient {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.headers = {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
        }
    }

    static factory() {
        const baseUrl = config.dataSourceUrl
        const apiKey = config.apiKey
        return new rebelInternetClient(baseUrl, apiKey);
    }

    track(params: {
        propertyUid: string;
        dateType: string;
        domain: string;
        location: {
            neLat: number | null;
            neLng: number | null;
            swLat: number | null;
            swLng: number | null;
            zoomLevel: number | null;
            query: string;
        };
        adults: number;
    }) {
        return axios.post(`${this.baseUrl}/query`, params, {
            headers: this.headers
        });
    }

    getRankingResults(params: {
        id: number;
        from: string;
        until: string;
    }) {
        return axios.get(`${this.baseUrl}/query/${params.id}`, {
            params: {
                from: params.from,
                until: params.until,
            },
            headers: this.headers,
        });
    }
}

export default rebelInternetClient;