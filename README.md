# POC Repository

This repository contains various Proof of Concept (POC) implementations for different features and ideas.

## Project Structure

```
src/
├── index.ts          # Main entry point
└── poc/              # POC implementations
    └── ranking-api/  # Ranking API POC
```

## Available POCs

### Ranking API

A proof of concept implementation of a ranking system API.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# List all available POCs
npm run list

# Run a specific POC directly (example for ranking API)
npm run dev:ranking

# Run any specific POC file with the dev script
npm run dev --file=src/poc/ranking-api/index.ts

# Run any TypeScript file directly with ts-node
npm run poc src/poc/ranking-api/index.ts

# Run the RabbitMQ example
npm run dev:rabbitmq

# Build all POCs
npm run build

# Run the built project
npm run start

# Copy .env.sample files to .env for all POCs (only if .env doesn't exist)
npm run copy:env
```

## Environment Configuration

Each POC has its own environment configuration:

1. `.env.sample` - Template showing required environment variables
2. `.env` - Actual configuration file (not committed to git)
3. `config.ts` - TypeScript module that loads and validates environment variables

To set up a new POC's environment:
```bash
# Copy the .env.sample to .env (only if .env doesn't exist)
cp src/poc/your-poc-name/.env.sample src/poc/your-poc-name/.env

# Edit the .env file with your specific settings
nano src/poc/your-poc-name/.env
```

Or use the convenience script to copy all sample files at once:
```bash
npm run copy:env
```

## Adding New POCs

The repository includes a template to make it easy to add new POCs:

1. Create a new folder under `src/poc/` (e.g., `src/poc/my-new-poc`)
2. Copy files from the template folder:
   ```bash
   cp -r src/poc/template/* src/poc/my-new-poc/
   ```
3. Rename and customize the `.env.sample` file with your required variables
4. Update `config.ts` to match your environment variables
5. Implement your POC in `index.ts`
6. Add a script to package.json:
   ```json
   "dev:my-new-poc": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/poc/my-new-poc/index.ts"
   ```
7. Import and add your POC in the main src/index.ts file
