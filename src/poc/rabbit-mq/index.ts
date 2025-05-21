/**
 * RabbitMQ POC
 * 
 * This module demonstrates a proof of concept for RabbitMQ integration.
 */

import config from './config';

export class RabbitMqExample {
    constructor() {
        console.log('RabbitMQ Example initialized');
        console.log(`Connecting to RabbitMQ at ${config.host}:${config.port}`);
        console.log(`Using vhost: ${config.vhost}`);
    }

    async connect(): Promise<void> {
        console.log(`Connecting using username: ${config.username}`);
        // In a real implementation, this would connect to RabbitMQ using amqplib
        console.log('Successfully connected!');
    }

    async publishMessage(message: string): Promise<void> {
        console.log(`Publishing message to exchange: ${config.exchangeName}`);
        console.log(`Message: ${message}`);
        // In a real implementation, this would publish a message to RabbitMQ
    }

    async consumeMessages(): Promise<void> {
        console.log(`Consuming messages from queue: ${config.queueName}`);
        // In a real implementation, this would consume messages from RabbitMQ
    }
}

// Example usage - this will run when the file is executed directly
if (require.main === module) {
    const example = new RabbitMqExample();

    const runDemo = async () => {
        await example.connect();
        await example.publishMessage('Hello from RabbitMQ POC!');
        await example.consumeMessages();
    };

    runDemo().catch(err => console.error('Error in RabbitMQ demo:', err));
}
