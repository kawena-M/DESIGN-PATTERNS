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
const SimpleCoffee_1 = require("./SimpleCoffee");
const MilkDecorator_1 = require("./MilkDecorator");
const SugarDecorator_1 = require("./SugarDecorator");
const Logger_1 = __importDefault(require("./utils/Logger"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let coffee = new SimpleCoffee_1.SimpleCoffee();
            Logger_1.default.warn('Created Simple Coffee');
            console.log(`${coffee.description()}: $${coffee.cost()}`);
            Logger_1.default.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);
            const milkAnswer = yield askQuestion('Do you want to add milk? (yes/no): ');
            if (milkAnswer.toLowerCase() === 'yes') {
                coffee = new MilkDecorator_1.MilkDecorator(coffee);
                Logger_1.default.warn('Added Milk to Coffee');
                console.log(`${coffee.description()}: $${coffee.cost()}`);
                Logger_1.default.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);
            }
            const sugarAnswer = yield askQuestion('Do you want to add sugar? (yes/no): ');
            if (sugarAnswer.toLowerCase() === 'yes') {
                coffee = new SugarDecorator_1.SugarDecorator(coffee);
                Logger_1.default.warn('Added Sugar to Coffee');
                console.log(`${coffee.description()}: $${coffee.cost()}`);
                Logger_1.default.warn(`Coffee: ${coffee.description()}, Cost: $${coffee.cost()}`);
            }
            console.log('Final Coffee:', coffee.description());
            console.log('Total Cost:', coffee.cost());
            Logger_1.default.warn(`Final Coffee: ${coffee.description()}, Total Cost: $${coffee.cost()}`);
            main();
        }
        catch (error) {
            console.error('An error occurred:', error.message);
            Logger_1.default.warn(`Error: ${error.message}`);
            main();
        }
    });
}
main();
