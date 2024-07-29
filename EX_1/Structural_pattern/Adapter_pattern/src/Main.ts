// src/Main.ts
import { Adapter } from './Adapter';
import logger from './utils/logger';
import * as readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function handleCommand(command: string): Promise<void> {
    try {
        if (command.toLowerCase() === 'oldrequest') {
            const adapter = new Adapter();
            adapter.oldRequest();
            logger.warn('Request processed and logged.');
            console.log('Request processed and logged.');
            await promptUser();
        } else if (command.toLowerCase() === 'exit') {
            logger.warn('Exiting application...');
            console.log('Exiting application...');
            rl.close();
        } else {
            logger.warn('Invalid command.');
            console.log('Invalid command.');
            await promptUser();
        }
    } catch (error) {
        console.error('An error occurred:', (error as Error).message);
        logger.warn('An error occurred');
        await promptUser();
    }
}

async function promptUser(): Promise<void> {
    try {
        const command = await askQuestion('Enter command (oldRequest/exit): ');
        await handleCommand(command);
    } catch (error) {
        console.error('An unexpected error occurred:', (error as Error).message);
        logger.warn(`Unexpected Error`);
        rl.close();
    }
}

// Start the application
promptUser();
