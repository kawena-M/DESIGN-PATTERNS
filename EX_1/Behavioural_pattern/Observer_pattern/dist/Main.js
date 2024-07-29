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
const NewsAgency_1 = require("./NewsAgency");
const User_1 = require("./User");
const readline = __importStar(require("readline"));
const logger_1 = __importDefault(require("./utils/logger"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const agency = new NewsAgency_1.NewsAgency();
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function addUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = yield askQuestion('Enter user name: ');
            if (!name.trim())
                throw new Error('User name cannot be empty.');
            const user = new User_1.User(name);
            agency.addObserver(user);
            logger_1.default.warn(`${name} has been added as a user.`);
            console.log(`${name} has been added as a user.`);
        }
        catch (error) {
            logger_1.default.warn(error.message);
            console.error(error.message);
        }
        mainMenu();
    });
}
function removeUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = yield askQuestion('Enter user name to remove: ');
            if (!name.trim())
                throw new Error('User name cannot be empty.');
            const users = agency['observers'];
            const user = users.find(user => user['name'] === name);
            if (!user)
                throw new Error('User not found.');
            agency.removeObserver(user);
            logger_1.default.warn(`${name} has been removed.`);
            console.log(`${name} has been removed.`);
        }
        catch (error) {
            logger_1.default.warn(error.message);
            console.error(error.message);
        }
        mainMenu();
    });
}
function publishNews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const news = yield askQuestion('Enter news to publish: ');
            if (!news.trim())
                throw new Error('News cannot be empty.');
            agency.publishNews(news);
        }
        catch (error) {
            logger_1.default.warn(error.message);
            console.error(error.message);
        }
        mainMenu();
    });
}
function mainMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('\nMain Menu');
        console.log('1. Add User');
        console.log('2. Remove User');
        console.log('3. Publish News');
        console.log('4. Exit');
        const choice = yield askQuestion('Select an option: ');
        switch (choice) {
            case '1':
                yield addUser();
                break;
            case '2':
                yield removeUser();
                break;
            case '3':
                yield publishNews();
                break;
            case '4':
                rl.close();
                break;
            default:
                console.log('Invalid choice, please select again.');
                mainMenu();
                break;
        }
    });
}
console.log('Welcome to the News Agency Application');
mainMenu();
