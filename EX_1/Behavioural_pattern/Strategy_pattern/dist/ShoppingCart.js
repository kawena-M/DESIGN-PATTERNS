"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingCart = void 0;
class ShoppingCart {
    constructor(items, paymentStrategy) {
        this.items = [];
        this.items = items;
        this.paymentStrategy = paymentStrategy;
    }
    setPaymentStrategy(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }
    checkout() {
        const totalAmount = this.items.reduce((sum, item) => sum + item.price, 0);
        this.paymentStrategy.pay(totalAmount);
    }
}
exports.ShoppingCart = ShoppingCart;
