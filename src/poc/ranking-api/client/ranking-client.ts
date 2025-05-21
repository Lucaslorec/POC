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
                'Authorization': `Bearer ${config.apiKey}`
            }
        });

        // Add request interceptor for logging
        this.axiosInstance.interceptors.request.use(
            (reqConfig: import('axios').InternalAxiosRequestConfig): import('axios').InternalAxiosRequestConfig => {
                if (config.logLevel === 'debug') {
                    console.log(`API Request: ${reqConfig.method?.toUpperCase()} ${reqConfig.url}`,
                        reqConfig.params || reqConfig.data);
                }
                return reqConfig;
            },
            (error: any) => {
                console.error('API Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor for logging and rate limiting handling
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse => {
                if (config.logLevel === 'debug') {
                    console.log(`API Response (${response.status}):`, response.data);
                }
                return response;
            },
            (error: any) => {
                // Check for rate limiting (HTTP 429)
                if (error.response?.status === 429) {
                    const retryAfter = error.response.headers['retry-after'] || 60;
                    console.warn(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);

                    // Add rate limiting details to the error
                    error.isRateLimited = true;
                    error.retryAfter = retryAfter;
                }

                console.error('API Response Error:', error.response?.status, error.response?.data || error.message);
                return Promise.reject(error);
            }
        );
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
