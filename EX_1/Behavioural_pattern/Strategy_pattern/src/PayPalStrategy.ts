import { PaymentStrategy } from './PaymentStrategy';
import logger from './utils/logger';
export class PayPalStrategy implements PaymentStrategy {
 pay(amount: number): void {
logger.warn(`Paid ${amount} using PayPal.`);
 console.log(`Paid ${amount} using PayPal.`);
 }
}
