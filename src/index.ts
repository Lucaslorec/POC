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
// import { RabbitMqExample } from './poc/rabbit-mq'; // Uncomment when implemented

// Export all POCs with documentation
export default {
    /**
     * Ranking API - Demonstrates a simple ranking system
     */
    rankingApi: RankingApi,

    /**
     * Additional POCs can be added here
     */
    // rabbitMq: RabbitMqExample,
};
