"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const OldSystem_1 = require("./OldSystem");
const NewSystem_1 = require("./NewSystem");
class Adapter extends OldSystem_1.OldSystem {
    constructor() {
        super();
        this.newSystem = new NewSystem_1.NewSystem();
    }
    oldRequest() {
        this.newSystem.newRequest();
    }
}
exports.Adapter = Adapter;
