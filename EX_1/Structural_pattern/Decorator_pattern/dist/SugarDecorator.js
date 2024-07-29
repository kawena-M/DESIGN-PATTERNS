"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SugarDecorator = void 0;
class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    cost() {
        return this.coffee.cost() + 1;
    }
    description() {
        return `${this.coffee.description()} with sugar`;
    }
}
exports.SugarDecorator = SugarDecorator;
