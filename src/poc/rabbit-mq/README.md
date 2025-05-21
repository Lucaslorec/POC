# RabbitMQ POC

This POC demonstrates integrating with RabbitMQ message broker.

## Configuration

Required environment variables are defined in `.env.sample`. Copy this file to `.env` and adjust the values as needed.

| Variable | Description | Default |
|----------|-------------|---------|
| RABBITMQ_HOST | RabbitMQ server host | localhost |
| RABBITMQ_PORT | RabbitMQ server port | 5672 |
| RABBITMQ_USERNAME | RabbitMQ username | guest |
| RABBITMQ_PASSWORD | RabbitMQ password | guest |
| RABBITMQ_VHOST | RabbitMQ virtual host | / |
| QUEUE_NAME | Name of the queue to use | N/A |
| EXCHANGE_NAME | Name of the exchange to use | N/A |

## Usage

```bash
# Run this POC directly
npm run dev:rabbitmq

# Or via the generic command
npm run dev --file=src/poc/rabbit-mq/index.ts
```

## Implementation

This POC demonstrates:
1. Connecting to RabbitMQ
2. Publishing messages to an exchange
3. Consuming messages from a queue
4. Environment-specific configuration
