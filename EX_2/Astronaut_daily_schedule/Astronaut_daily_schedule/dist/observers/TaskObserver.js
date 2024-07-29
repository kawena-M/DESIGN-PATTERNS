"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskObserver = void 0;
class TaskObserver {
    update(event, taskDescription) {
        console.log(`Task ${event}: ${taskDescription}`);
    }
}
exports.TaskObserver = TaskObserver;
