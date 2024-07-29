import * as readline from 'readline';
import { Logger } from './utils/logger';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logger = Logger.getInstance();

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
    try {
        while (true) {
            const message = await askQuestion('Enter a message to log (or type "exit" to quit): ');
            if (message.toLowerCase() === 'exit') {
                break;
            }
            logger.log(message);
            console.log('Message logged.');
        }
    } catch (error) {
        console.error('An error occurred:', (error as Error).message);
    } finally {
        rl.close();
    }
}

main();
