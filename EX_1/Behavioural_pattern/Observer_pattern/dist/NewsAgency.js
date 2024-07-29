"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsAgency = void 0;
const Subject_1 = require("./Subject");
const logger_1 = __importDefault(require("./utils/logger"));
class NewsAgency extends Subject_1.Subject {
    publishNews(news) {
        logger_1.default.warn(`News Published: ${news}`);
        console.log(`News Published: ${news}`);
        this.notify(news);
    }
}
exports.NewsAgency = NewsAgency;
