"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingCart_1 = require("./ShoppingCart");
const CreditCardStrategy_1 = require("./CreditCardStrategy");
const PayPalStrategy_1 = require("./PayPalStrategy");
const logger_1 = __importDefault(require("./utils/logger"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function getItemFromUser() {
    return __awaiter(this, arguments, void 0, function* (items = []) {
        try {
            const name = yield askQuestion('Enter item name: ');
            if (!name)
                throw new Error('Item name cannot be empty.');
            const price = parseFloat(yield askQuestion('Enter item price: '));
            if (!Number.isInteger(price)) {
                throw new Error('Item price must be an integer (default as 0).');
            }
            if (isNaN(price) || price <= 0)
                throw new Error('Item price must be a positive number.');
            items.push(new Item(name, price));
            const more = yield askQuestion('Do you want to add another item? (yes/no): ');
            if (more.toLowerCase() === 'yes') {
                return getItemFromUser(items);
            }
            else if (more.toLowerCase() === 'no') {
                logger_1.default.warn('ll Items added to cart');
                console.log('All Items added to cart');
                return items;
            }
            else {
                logger_1.default.warn('Invalid option given..moving to payment');
                // throw new Error('Invalid option given..moving to payment');
                return items;
            }
        }
        catch (error) {
            logger_1.default.warn(error.message);
            console.error(error.message);
            return getItemFromUser(items);
        }
    });
}
function getPaymentStrategyFromUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const paymentMethod = yield askQuestion('Enter payment method (CreditCard/PayPal): ');
        try {
            switch (paymentMethod.toLowerCase()) {
                case 'paypal':
                    return new PayPalStrategy_1.PayPalStrategy();
                case 'creditcard':
                    return new CreditCardStrategy_1.CreditCardStrategy();
                default:
                    logger_1.default.warn('Invalid payment method. Please enter "CreditCard" or "PayPal".');
                    console.error('Invalid payment method. Please enter "CreditCard" or "PayPal".');
                    return getPaymentStrategyFromUser();
            }
        }
        catch (error) {
            console.error(error.message);
            return getPaymentStrategyFromUser();
        }
    });
}
function toContinue() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const choice = yield askQuestion('Do you want to continue shopping (yes/no): ');
            if (choice.toLowerCase() === 'yes') {
                yield main();
            }
            else if (choice.toLowerCase() === 'no') {
                rl.close();
            }
            else {
                throw new Error("Invalid option given");
            }
        }
        catch (error) {
            logger_1.default.warn('An unexpected error occurred:Invalid option given');
            console.error(error.message);
            toContinue();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Welcome to the Shopping Cart Application');
        const items = yield getItemFromUser();
        const initialPaymentStrategy = yield getPaymentStrategyFromUser();
        const cart = new ShoppingCart_1.ShoppingCart(items, initialPaymentStrategy);
        cart.checkout();
        toContinue();
    });
}
main();
