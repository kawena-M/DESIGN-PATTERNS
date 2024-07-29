"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskFactory = void 0;
const Task_1 = require("../models/Task");
const logger_1 = __importDefault(require("../utils/logger"));
class TaskFactory {
    static createTask(description, startTime, endTime, priority, status = false) {
        if (!description.trim() || !startTime.trim() || !endTime.trim() || !priority.trim()) {
            throw new Error('Invalid input: Description, start time, end time, and priority are required.');
        }
        if (!['High', 'Medium', 'Low'].includes(priority)) {
            logger_1.default.warn('Invalid priority provided.');
            throw new Error('Invalid priority: Valid values are High, Medium, or Low.');
        }
        if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
            logger_1.default.warn('Invalid time format provided.');
            throw new Error('Invalid time format. Use 24 hours format.');
        }
        if (new Date(`1970-01-01T${startTime}:00`) >= new Date(`1970-01-01T${endTime}:00`)) {
            logger_1.default.warn('Invalid start time and end time provided.');
            throw new Error('Start time must be before end time.');
        }
        return new Task_1.Task(description, new Date(`1970-01-01T${startTime}:00`), new Date(`1970-01-01T${endTime}:00`), priority, status);
    }
}
exports.TaskFactory = TaskFactory;
function isValidTimeFormat(time) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
}
