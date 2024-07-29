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
// src/Main.ts
const Adapter_1 = require("./Adapter");
const logger_1 = __importDefault(require("./utils/logger"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function handleCommand(command) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (command.toLowerCase() === 'oldrequest') {
                const adapter = new Adapter_1.Adapter();
                adapter.oldRequest();
                logger_1.default.warn('Request processed and logged.');
                console.log('Request processed and logged.');
                yield promptUser();
            }
            else if (command.toLowerCase() === 'exit') {
                logger_1.default.warn('Exiting application...');
                console.log('Exiting application...');
                rl.close();
            }
            else {
                logger_1.default.warn('Invalid command.');
                console.log('Invalid command.');
                yield promptUser();
            }
        }
        catch (error) {
            console.error('An error occurred:', error.message);
            logger_1.default.warn('An error occurred');
            yield promptUser();
        }
    });
}
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = yield askQuestion('Enter command (oldRequest/exit): ');
            yield handleCommand(command);
        }
        catch (error) {
            console.error('An unexpected error occurred:', error.message);
            logger_1.default.warn(`Unexpected Error`);
            rl.close();
        }
    });
}
// Start the application
promptUser();
