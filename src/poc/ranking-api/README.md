# Airbnb Ranking API POC

This POC demonstrates tracking and analyzing property rankings from Airbnb search results. It integrates with an external Airbnb API to track how properties rank in search results over time.

## Configuration

Required environment variables are defined in `.env.sample`. Copy this file to `.env` and adjust the values as needed.

| Variable | Description | Default |
|----------|-------------|---------|
| API_PORT | Port on which the API will run | 3000 |
| API_KEY | API key for authentication with the Airbnb API | N/A |
| DATA_SOURCE_URL | Base URL of the Airbnb Ranking API | https://api-airbnb.rebelinternet.eu/api/airbnb/v1 |
| REQUEST_TIMEOUT_MS | Timeout for API requests in milliseconds | 30000 |
| LOG_LEVEL | Logging level (debug, info, warn, error) | info |

## Usage

```bash
# Run this POC directly
npm run dev:ranking

# Or via the generic command
npm run dev --file=src/poc/ranking-api/index.ts
```

## Implementation

This POC demonstrates:
1. Clean layered architecture with separation of concerns
2. Implementation of factory pattern for dependency injection
3. Type-safe API integration using TypeScript interfaces
4. Configuration management with environment variables
5. Pagination support for handling large result sets
6. Intelligent error handling with rate limiting and exponential backoff

## Architecture

The implementation follows a layered architecture using factory functions for dependency injection:

```
createRankingApi() (Factory function)
     │
     ├─── createRankingService() (Business Logic)
     │         │
     │         └─── createRankingClient() (API Integration)
     │               │
     │               └─── Retry & Error Handling
     │
     └─── Types & Models (Data Structures)
```

### API Endpoints Used

- `POST /api/airbnb/v1/query` - Create a new tracking query
- `GET /api/airbnb/v1/query/{id}` - Get results for a specific query (supports pagination)
- `GET /api/airbnb/v1/query` - List all active queries

### Pagination and Sorting Support

Results can be paginated and sorted using the following parameters:

```typescript
// Example with pagination
const page1 = await api.getRankingResults('query-id', 1, 10); // Page 1, 10 items per page
const page2 = await api.getRankingResults('query-id', 2, 10); // Page 2, 10 items per page

// Example with sorting
const cheapestFirst = await api.getRankingResults('query-id', 1, 10, 'price', 'asc');
const bestRated = await api.getRankingResults('query-id', 1, 10, 'rating', 'desc');
const topRanked = await api.getRankingResults('query-id', 1, 10, 'position', 'asc');
```

### Error Handling

The client implements intelligent error handling for API rate limits:

1. **Rate Limit Detection**: Automatically detects HTTP 429 responses
2. **Backoff Strategy**: Uses exponential backoff with configurable parameters
3. **Retry-After Header**: Respects the API's retry-after header when available

```typescript
// Rate limit handling is automatic and transparent to the caller
try {
  const results = await api.getRankingResults('query-id');
  // API calls with rate limiting will be retried automatically
} catch (error) {
  // Only thrown after multiple retry attempts fail
}
```
- `GET /api/airbnb/v1/query/{id}` - Get results for a specific query
- `GET /api/airbnb/v1/query` - List all active queries

## Example Usage

```typescript
import { RankingApi } from './poc/ranking-api';

// Create an instance
const api = new RankingApi();

// Start tracking rankings for a location and date range
const query = await api.trackRankings(
  'Barcelona, Spain', 
  '2025-06-01',   // Check-in date 
  '2025-06-07'    // Check-out date
);

// Get results using the query ID
const results = await api.getRankingResults(query.id);

// Get all active tracking queries
const queries = await api.getActiveQueries();
```
