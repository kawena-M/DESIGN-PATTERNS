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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleManager_1 = require("./managers/ScheduleManager");
const TaskFactory_1 = require("./factories/TaskFactory");
const TaskObserver_1 = require("./observers/TaskObserver");
const logger_1 = __importDefault(require("./utils/logger"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const scheduleManager = ScheduleManager_1.ScheduleManager.getInstance();
const taskObserver = new TaskObserver_1.TaskObserver();
scheduleManager.addObserver(taskObserver);
function promptUser() {
    rl.question('Choose an option: (1) Add Task (2) Remove Task (3) Edit Task (4) View Tasks (5) Exit\n', (option) => {
        switch (option) {
            case '1':
                addTaskPrompt();
                break;
            case '2':
                removeTaskPrompt();
                break;
            case '3':
                editTaskPrompt();
                break;
            case '4':
                viewTasksPrompt();
                break;
            case '5':
                rl.close();
                break;
            default:
                logger_1.default.warn(`Invalid option selected: ${option}`);
                console.log('Invalid option. Please try again.');
                promptUser();
                break;
        }
    });
}
function addTaskPrompt() {
    getTaskDetails((description, startTime, endTime, priority) => {
        if (!description || !startTime || !endTime || !priority) {
            logger_1.default.warn('Attempted to add a task with missing fields.');
            console.log('Error: All fields (description, start time, end time, priority) are required.');
            promptUser();
            return;
        }
        try {
            const task = TaskFactory_1.TaskFactory.createTask(description, startTime, endTime, priority);
            scheduleManager.addTask(task)
                .then(result => {
                console.log(result);
                promptUser();
            })
                .catch(error => {
                console.error('Error while adding task:', error.message);
                promptUser();
            });
        }
        catch (error) {
            console.error('Error while adding task:', error.message);
            promptUser();
        }
    });
}
function removeTaskPrompt() {
    rl.question('Enter task description to remove: ', (description) => {
        if (!description) {
            logger_1.default.warn('Attempted to remove a task without providing a description.');
            console.log('Error: Task description is required.');
            promptUser();
            return;
        }
        scheduleManager.removeTask(description)
            .then(result => {
            console.log(result);
            promptUser();
        })
            .catch(error => {
            console.error('Error while removing task:', error.message);
            promptUser();
        });
    });
}
function editTaskPrompt() {
    scheduleManager.viewTasks("")
        .then(result => {
        console.log(result);
        rl.question('Enter task description to edit: ', (currentDescription) => {
            getTaskDetails((newDescription, newStartTime, newEndTime, newPriority) => {
                rl.question('Enter new status (true or false): ', (newStatus) => {
                    if (!currentDescription) {
                        logger_1.default.warn('Attempted to edit a task with missing fields.');
                        console.log('Error: Description for current task is required.');
                        promptUser();
                        return;
                    }
                    try {
                        scheduleManager.editTask(currentDescription, newDescription, newStartTime, newEndTime, newPriority, Boolean(newStatus))
                            //     .then(result => {
                            //         return Promise.resolve(result);
                            // })
                            .then(res => {
                            console.log(res);
                            promptUser();
                        })
                            .catch(error => {
                            console.error('Error while editing task:', error.message);
                            promptUser();
                        });
                    }
                    catch (error) {
                        console.error('Error while editing task:', error.message);
                        promptUser();
                    }
                });
            });
        });
    })
        .catch(error => {
        console.error('Error while viewing tasks:', error.message);
        promptUser();
    });
}
function viewTasksPrompt() {
    rl.question('Enter priority to filter (leave empty for all): ', (priority) => {
        scheduleManager.viewTasks(priority.trim())
            .then(result => {
            console.log(result);
            promptUser();
        })
            .catch(error => {
            console.error('Error while viewing tasks:', error.message);
            promptUser();
        });
    });
}
function getTaskDetails(callback) {
    rl.question('Enter task description: ', (description) => {
        rl.question('Enter start time (HH:MM): ', (startTime) => {
            rl.question('Enter end time (HH:MM): ', (endTime) => {
                rl.question('Enter priority (High, Medium, Low): ', (priority) => {
                    callback(description, startTime, endTime, priority);
                });
            });
        });
    });
}
promptUser();
