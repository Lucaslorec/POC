/**
 * POC Registry
 * 
 * This file simply exports all available POCs in the repository for documentation
 * and programmatic access. Each POC can also be run directly without using this file.
 * 
 * To run individual POCs directly:
 * npm run dev --file=src/poc/[poc-name]/index.ts
 * 
 * Or use the convenience scripts in package.json:
 * npm run dev:ranking
 */

// Import all POCs
import { RankingApi } from './poc/ranking-api';
import { RabbitMqExample } from './poc/rabbit-mq';

// Export all POCs with documentation
export default {
    /**
     * Ranking API - Demonstrates a simple ranking system
     * Environment variables:
     * - API_PORT: Port for the API server
     * - API_KEY: Authentication key
     * - DATA_SOURCE_URL: Data source URL
     * - LOG_LEVEL: Logging level (debug, info, warn, error)
     */
    rankingApi: RankingApi,

    /**
     * RabbitMQ Example - Demonstrates RabbitMQ integration
     * Environment variables:
     * - RABBITMQ_HOST: RabbitMQ server host
     * - RABBITMQ_PORT: RabbitMQ server port
     * - RABBITMQ_USERNAME: RabbitMQ username
     * - RABBITMQ_PASSWORD: RabbitMQ password
     * - RABBITMQ_VHOST: RabbitMQ virtual host
     * - QUEUE_NAME: Queue name
     * - EXCHANGE_NAME: Exchange name
     */
    rabbitMq: RabbitMqExample,
};
