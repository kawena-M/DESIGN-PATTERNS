import { SimpleCoffee } from './SimpleCoffee';
import { Coffee } from './Coffee';
import { MilkDecorator } from './MilkDecorator';
import { SugarDecorator } from './SugarDecorator';
import logger from './utils/Logger';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
    try {
        let coffee: Coffee = new SimpleCoffee();
        logger.warn('Created Simple Coffee');

        console.log(`${coffee.description()}: $${coffee.cost()}`);
        logger.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);

        const milkAnswer = await askQuestion('Do you want to add milk? (yes/no): ');
        if (milkAnswer.toLowerCase() === 'yes') {
            coffee = new MilkDecorator(coffee);
            logger.warn('Added Milk to Coffee');
            console.log(`${coffee.description()}: $${coffee.cost()}`);
            logger.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);
        }

        const sugarAnswer = await askQuestion('Do you want to add sugar? (yes/no): ');
        if (sugarAnswer.toLowerCase() === 'yes') {
            coffee = new SugarDecorator(coffee);
            logger.warn('Added Sugar to Coffee');
            console.log(`${coffee.description()}: $${coffee.cost()}`);
            logger.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);
        }

        console.log('Final Coffee:', coffee.description());
        console.log('Total Cost:', coffee.cost());
        logger.warn(`Final Coffee: ${coffee.description()}, Total Cost: $${coffee.cost()}`);
        main();
    } catch (error) {
        console.error('An error occurred:', (error as Error).message);
        logger.warn(`Error: ${(error as Error).message}`);
        main();
    } 
}

main();
