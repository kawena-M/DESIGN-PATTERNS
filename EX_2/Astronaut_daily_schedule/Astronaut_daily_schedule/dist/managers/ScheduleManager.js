"use strict";
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
exports.ScheduleManager = void 0;
const TaskFactory_1 = require("../factories/TaskFactory");
const Subject_1 = require("../observers/Subject");
const retry_1 = require("../utils/retry");
const logger_1 = __importDefault(require("../utils/logger"));
class ScheduleManager extends Subject_1.Subject {
    constructor() {
        super();
        this.tasks = [];
    }
    static getInstance() {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }
    addTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, retry_1.retry)(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    for (const existingTask of this.tasks) {
                        if (this.isConflict(existingTask, task)) {
                            logger_1.default.warn(`Conflict with existing task ${existingTask.description} while adding ${task.description}`);
                            this.notify('Conflict with existing task ', existingTask.description);
                            return `Error: Task conflicts with existing task "${existingTask.description}".`;
                        }
                    }
                    this.tasks.push(task);
                    this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
                    logger_1.default.warn(`Task ${task.description} added successfully with no conflicts.`);
                    this.notify('add', task.description);
                    return `Task added successfully. No conflicts.`;
                }
                catch (error) {
                    logger_1.default.warn('Error: Failed to add task.');
                    return 'Error: Failed to add task. Please try again.';
                }
            }));
        });
    }
    removeTask(description) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, retry_1.retry)(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const index = this.tasks.findIndex(task => task.description === description);
                    if (index === -1) {
                        logger_1.default.warn(`Error: Task not Found while removing ${description}`);
                        return `Error: Task not found while removing.`;
                    }
                    this.tasks.splice(index, 1);
                    logger_1.default.warn(`Task removed successfully ${description}`);
                    this.notify('remove', description);
                    return `Task removed successfully.`;
                }
                catch (error) {
                    logger_1.default.warn(`Failed to remove task ${description}`);
                    return 'Error: Failed to remove task. Please try again.';
                }
            }));
        });
    }
    editTask(description, newDescription, newStartTime, newEndTime, newPriority, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, retry_1.retry)(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const index = this.tasks.findIndex(task => task.description === description);
                    if (index === -1) {
                        logger_1.default.warn(`Error: Task ${description} not Found while editing.`);
                        return `Error: Task not found .`;
                    }
                    let updatedTask;
                    if (!newDescription.trim() && !newStartTime.trim() && !newEndTime.trim() && !newPriority.trim()) {
                        this.tasks[index].status = newStatus;
                        logger_1.default.warn(`Task: ${this.tasks[index].description} updated successfully`);
                        this.notify('edit', description);
                        return `Task updated successfully.`;
                    }
                    if (!newDescription.trim()) {
                        updatedTask = TaskFactory_1.TaskFactory.createTask(description, newStartTime, newEndTime, newPriority, newStatus);
                    }
                    else {
                        updatedTask = TaskFactory_1.TaskFactory.createTask(newDescription, newStartTime, newEndTime, newPriority, newStatus);
                    }
                    for (const existingTask of this.tasks) {
                        if (this.isConflict(existingTask, updatedTask) && existingTask.description !== updatedTask.description) {
                            logger_1.default.warn('Conflict with existing task while adding', existingTask.description);
                            this.notify('Task Conflict with existing task while adding newtask', existingTask.description);
                            return `Error: Task conflicts with existing task "${existingTask.description}".`;
                        }
                    }
                    this.tasks[index] = updatedTask;
                    this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
                    this.notify('edit', newDescription || description);
                    logger_1.default.warn(`Task: ${this.tasks[index].description} updated successfully`);
                    return `Task updated successfully.`;
                }
                catch (error) {
                    logger_1.default.warn(`Task: ${description} not updated`);
                    return 'Error: Failed to edit task. Please try again.';
                }
            }));
        });
    }
    viewTasks(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, retry_1.retry)(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!['High', 'Medium', 'Low', ''].includes(priority)) {
                        logger_1.default.warn('Invalid priority: Valid values are High, Medium, or Low.');
                        throw new Error('Invalid priority: Valid values are High, Medium, or Low.');
                    }
                    const filteredTasks = priority
                        ? this.tasks.filter(task => task.priority === priority)
                        : this.tasks;
                    if (filteredTasks.length === 0) {
                        logger_1.default.warn('No Task Scheduled for a day.');
                        throw new Error('No Task Scheduled for a day.');
                    }
                    return filteredTasks.map(task => `${task.startTime.toTimeString().slice(0, 5)} - ${task.endTime.toTimeString().slice(0, 5)}: ${task.description} [${task.priority}] Status:${task.status}`).join('\n');
                }
                catch (error) {
                    return error.message;
                }
            }));
        });
    }
    isConflict(task1, task2) {
        return (task1.startTime < task2.endTime) && (task2.startTime < task1.endTime);
    }
}
exports.ScheduleManager = ScheduleManager;
