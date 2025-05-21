# Ranking API POC

This POC demonstrates a simple ranking system API.

## Configuration

Required environment variables are defined in `.env.sample`. Copy this file to `.env` and adjust the values as needed.

| Variable | Description | Default |
|----------|-------------|---------|
| API_PORT | Port on which the API will run | 3000 |
| API_KEY | API key for authentication | N/A |
| DATA_SOURCE_URL | URL of the data source | N/A |
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
1. Loading configuration from environment variables
2. Basic API structure with TypeScript
3. Environment-specific configuration
