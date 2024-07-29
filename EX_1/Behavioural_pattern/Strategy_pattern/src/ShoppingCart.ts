// src/ShoppingCart.ts
import { PaymentStrategy } from './PaymentStrategy';

interface Item {
    name: string;
    price: number;
}

export class ShoppingCart {
    private items: Item[] = [];
    private paymentStrategy: PaymentStrategy;

    constructor(items: Item[],paymentStrategy: PaymentStrategy) {
        this.items = items;
        this.paymentStrategy = paymentStrategy;
    }

    setPaymentStrategy(paymentStrategy: PaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    checkout(): void {
        const totalAmount = this.items.reduce((sum, item) => sum + item.price, 0);
        this.paymentStrategy.pay(totalAmount);
    }
}
