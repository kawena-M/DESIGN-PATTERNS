"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeFactory = void 0;
const Circle_1 = require("./Circle");
const Square_1 = require("./Square");
class ShapeFactory {
    static createShape(type) {
        switch (type) {
            case 'circle':
                return new Circle_1.Circle();
            case 'square':
                return new Square_1.Square();
            default:
                throw new Error('Invalid shape type');
        }
    }
}
exports.ShapeFactory = ShapeFactory;
