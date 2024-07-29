import { ShoppingCart } from './ShoppingCart';
import { CreditCardStrategy } from './CreditCardStrategy';
import { PayPalStrategy } from './PayPalStrategy';
import logger from './utils/logger';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Item {
  constructor(public name: string, public price: number) {}
}

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function getItemFromUser(items: Item[]=[]): Promise<Item[]> {
  try {
    const name = await askQuestion('Enter item name: ');
    if (!name)
      throw new Error('Item name cannot be empty.');
    const price = parseFloat(await askQuestion('Enter item price: '));
    if (!Number.isInteger(price)) {
      throw new Error('Item price must be an integer (default as 0).');
    }
    if (isNaN(price) || price <= 0)
      throw new Error('Item price must be a positive number.');
    items.push(new Item(name, price));

    const more = await askQuestion('Do you want to add another item? (yes/no): ');
    if (more.toLowerCase() === 'yes') {
      return getItemFromUser(items); 
    } else if (more.toLowerCase() === 'no') {
      logger.warn('ll Items added to cart');
      console.log('All Items added to cart');
      return items;
    } else {
      logger.warn('Invalid option given..moving to payment'); 
      // throw new Error('Invalid option given..moving to payment');
      return items;
    }
  } catch (error) {
    logger.warn((error as Error).message); 
    console.error((error as Error).message);
    return getItemFromUser(items); 
  }
      
  }


  async function getPaymentStrategyFromUser(): Promise<any> {
    const paymentMethod = await askQuestion('Enter payment method (CreditCard/PayPal): ');
    try {
      switch (paymentMethod.toLowerCase()) {
        case 'paypal':
          return new PayPalStrategy();
        case 'creditcard':
          return new CreditCardStrategy();
        default:
          logger.warn('Invalid payment method. Please enter "CreditCard" or "PayPal".');
          console.error('Invalid payment method. Please enter "CreditCard" or "PayPal".');
          return getPaymentStrategyFromUser(); 
      }
    } catch (error) {
      console.error((error as Error).message);
      return getPaymentStrategyFromUser(); 
    }
  }
async function toContinue():Promise<any>{
  try{
    const choice = await askQuestion('Do you want to continue shopping (yes/no): ');
    if (choice.toLowerCase() === 'yes') {
      await main();
    } else if (choice.toLowerCase() ==='no') {
      rl.close();
    }
    else{
        throw  new Error("Invalid option given");
    }
  }catch(error){
      logger.warn('An unexpected error occurred:Invalid option given');
    console.error((error as Error).message);
    toContinue();
    }
}
async function main() {
        console.log('Welcome to the Shopping Cart Application');
        const items = await getItemFromUser();
        const initialPaymentStrategy = await getPaymentStrategyFromUser();
    
        const cart = new ShoppingCart(items, initialPaymentStrategy);
        cart.checkout();
        toContinue();

}
main();