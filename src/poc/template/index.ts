/**
 * POC Template
 * 
 * This is a template for creating new POCs.
 */

import config from './config';

export class PocTemplate {
    constructor() {
        console.log('POC Template initialized');
        console.log(`API will run on port: ${config.apiPort}`);
        console.log(`Log level: ${config.logLevel}`);
    }

    async run(): Promise<void> {
        console.log(`Using API Key: ${config.apiKey.substring(0, 3)}...`);
        console.log(`Connecting to external service: ${config.externalServiceUrl}`);

        // Your POC implementation here

        return Promise.resolve();
    }
}

// Example usage - this will run when the file is executed directly
if (require.main === module) {
    const poc = new PocTemplate();
    poc.run()
        .then(() => console.log('POC execution completed'))
        .catch(error => console.error('Error during POC execution:', error));
}
