/**
 * POC Template Configuration
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
 * Environment variable configuration for this POC
 */
export interface PocConfig {
    // Define your configuration interface here
    // Example:
    apiPort: number;
    apiKey: string;
    externalServiceUrl: string;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
}

/**
 * Get a value from environment variables with validation
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
export const config: PocConfig = {
    // Update these with your specific environment variables
    apiPort: parseInt(getEnvVar('API_PORT', '3000'), 10),
    apiKey: getEnvVar('API_KEY'),
    externalServiceUrl: getEnvVar('EXTERNAL_SERVICE_URL'),
    logLevel: getEnvVar('LOG_LEVEL', 'info') as PocConfig['logLevel'],
};

export default config;
