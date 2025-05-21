/**
 * RabbitMQ POC Configuration
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
 * Environment variable configuration for the RabbitMQ POC
 */
export interface RabbitMqConfig {
    /** RabbitMQ server host */
    host: string;

    /** RabbitMQ server port */
    port: number;

    /** RabbitMQ username */
    username: string;

    /** RabbitMQ password */
    password: string;

    /** RabbitMQ virtual host */
    vhost: string;

    /** Name of the queue to use */
    queueName: string;

    /** Name of the exchange to use */
    exchangeName: string;
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
export const config: RabbitMqConfig = {
    host: getEnvVar('RABBITMQ_HOST', 'localhost'),
    port: parseInt(getEnvVar('RABBITMQ_PORT', '5672'), 10),
    username: getEnvVar('RABBITMQ_USERNAME', 'guest'),
    password: getEnvVar('RABBITMQ_PASSWORD', 'guest'),
    vhost: getEnvVar('RABBITMQ_VHOST', '/'),
    queueName: getEnvVar('QUEUE_NAME'),
    exchangeName: getEnvVar('EXCHANGE_NAME'),
};

export default config;
