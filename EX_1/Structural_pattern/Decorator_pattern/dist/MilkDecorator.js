"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilkDecorator = void 0;
class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost() + 2;
    }
    description() {
        return `${this.coffee.description()} with milk`;
    }
}
exports.MilkDecorator = MilkDecorator;
