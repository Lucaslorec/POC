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

# Build all POCs
npm run build

# Run the built project
npm run start
```

## Adding New POCs

To add a new POC:

1. Create a new folder under `src/poc/`
2. Implement your POC
3. Import and use it in the main entry point if needed
