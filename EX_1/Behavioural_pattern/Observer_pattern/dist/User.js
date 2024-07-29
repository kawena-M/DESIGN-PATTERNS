"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name) {
        this.name = name;
    }
    update(news) {
        console.log(`${this.name} received news: ${news}`);
    }
}
exports.User = User;
