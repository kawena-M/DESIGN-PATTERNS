"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPalStrategy = void 0;
const logger_1 = __importDefault(require("./utils/logger"));
class PayPalStrategy {
    pay(amount) {
        logger_1.default.warn(`Paid ${amount} using PayPal.`);
        console.log(`Paid ${amount} using PayPal.`);
    }
}
exports.PayPalStrategy = PayPalStrategy;
