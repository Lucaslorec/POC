/**
 * Ranking API Configuration
 * 
 * This module loads environment variables from the .env file and exposes them
 * as a typed configuration object. This makes it clear which environment
 * variables are required for this POC.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Environment variable configuration for the Ranking API
 */
export interface RankingApiConfig {
    /** Port on which the API will run */
    port: number;

    /** API key for authentication */
    apiKey: string;

    /** Base URL of the Airbnb ranking API */
    dataSourceUrl: string;

    /** Timeout for API requests in milliseconds */
    requestTimeoutMs: number;

    /** Logging level (debug, info, warn, error) */
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Get a value from environment variables with validation and type conversion
 */
function getEnvVar(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}

/**
 * Configuration object with values from environment variables
 */
export const config: RankingApiConfig = {
    port: parseInt(getEnvVar('API_PORT', '3000'), 10),
    apiKey: getEnvVar('API_KEY'),
    dataSourceUrl: getEnvVar('DATA_SOURCE_URL', 'https://api-airbnb.rebelinternet.eu/api/airbnb/v1'),
    requestTimeoutMs: parseInt(getEnvVar('REQUEST_TIMEOUT_MS', '30000'), 10),
    logLevel: getEnvVar('LOG_LEVEL', 'info') as RankingApiConfig['logLevel'],
};

export default config;
