import { ShapeFactory } from './ShapeFactory';
import * as readline from 'readline';
import logger from './utils/logger';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function getShapeFromUser(): Promise<string> {
    try {
        const shapeType = await askQuestion('Enter shape type (circle/square): ');
        if (!shapeType) {
            throw new Error('Shape type cannot be empty.');
        }
        return shapeType.toLowerCase();
    } catch (error) {
        console.error((error as Error).message);
        logger.error((error as Error).message);
        return getShapeFromUser();
    }
}

async function main() {
    try {
        const shapeType = await getShapeFromUser();
        const shape = ShapeFactory.createShape(shapeType);
        shape.draw();
        logger.info(`Shape ${shapeType} created and drawn successfully.`);

        const choice = await askQuestion('Do you want to create another shape? (yes/no): ');
        if (choice.toLowerCase() === 'yes') {
            await main();
        } else if (choice.toLowerCase() === 'no') {
            rl.close();
        } else {
            throw new Error('Invalid option given');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', (error as Error).message);
        logger.error(`Unexpected error: ${(error as Error).message}`);
        rl.close();
    }
}

console.log('Welcome to the Shape Factory Application');
main();
