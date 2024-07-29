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
const ShapeFactory_1 = require("./ShapeFactory");
const readline = __importStar(require("readline"));
const logger_1 = __importDefault(require("./utils/logger"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function getShapeFromUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shapeType = yield askQuestion('Enter shape type (circle/square): ');
            if (!shapeType) {
                throw new Error('Shape type cannot be empty.');
            }
            return shapeType.toLowerCase();
        }
        catch (error) {
            console.error(error.message);
            logger_1.default.error(error.message);
            return getShapeFromUser();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const shapeType = yield getShapeFromUser();
            const shape = ShapeFactory_1.ShapeFactory.createShape(shapeType);
            shape.draw();
            logger_1.default.info(`Shape ${shapeType} created and drawn successfully.`);
            const choice = yield askQuestion('Do you want to create another shape? (yes/no): ');
            if (choice.toLowerCase() === 'yes') {
                yield main();
            }
            else if (choice.toLowerCase() === 'no') {
                rl.close();
            }
            else {
                throw new Error('Invalid option given');
            }
        }
        catch (error) {
            console.error('An unexpected error occurred:', error.message);
            logger_1.default.error(`Unexpected error: ${error.message}`);
            rl.close();
        }
    });
}
console.log('Welcome to the Shape Factory Application');
main();
