import { Coffee } from './Coffee';
export class SimpleCoffee implements Coffee {     cost(): number {         return 5;
    }
    description(): string {         
        return 'Simple coffee';
    }
}
