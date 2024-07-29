import { PaymentStrategy } from './PaymentStrategy';
import logger from './utils/logger';

export class CreditCardStrategy implements PaymentStrategy {
 pay(amount: number): void {
    logger.warn(Paid ${amount} using Credir card.);
 console.log(Paid ${amount} using Credit Card.);
 }
}