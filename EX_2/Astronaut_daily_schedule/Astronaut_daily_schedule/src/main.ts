import { ScheduleManager } from './managers/ScheduleManager';
import { TaskFactory } from './factories/TaskFactory';
import { TaskObserver } from './observers/TaskObserver';
import logger from './utils/logger';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const scheduleManager = ScheduleManager.getInstance();
const taskObserver = new TaskObserver();
scheduleManager.addObserver(taskObserver);
function promptUser(): void {
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
                        logger.warn(`Invalid option selected: ${option}`);
                        console.log('Invalid option. Please try again.');
                        promptUser();
                        break;
                }
            }
        );
    }
    
    function addTaskPrompt(): void {
        getTaskDetails((description, startTime, endTime, priority) => {
            if (!description || !startTime || !endTime || !priority) {
                logger.warn('Attempted to add a task with missing fields.');
                console.log('Error: All fields (description, start time, end time, priority) are required.');
                promptUser();
                return;
            }
    
            try {
                const task = TaskFactory.createTask(description, startTime, endTime, priority);
                scheduleManager.addTask(task)
                    .then(result => {
                        console.log(result);
                        promptUser();
                    })
                    .catch(error => {
                        console.error('Error while adding task:', error.message);
                        promptUser();
                    });
            } catch (error) {
                console.error('Error while adding task:', (error as Error).message);
                promptUser();
            }
        });
    }
    
    function removeTaskPrompt(): void {
        rl.question('Enter task description to remove: ', (description) => {
                if (!description) {
                    logger.warn('Attempted to remove a task without providing a description.');
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
            } 
        );
    }
    
    function editTaskPrompt(): void {
        scheduleManager.viewTasks("")
        .then(result => {
            console.log(result);
            rl.question('Enter task description to edit: ', (currentDescription) => {
                getTaskDetails((newDescription, newStartTime, newEndTime, newPriority) => {
                    rl.question('Enter new status (true or false): ', (newStatus) => {
                        if (!currentDescription) {
                            logger.warn('Attempted to edit a task with missing fields.');
                            console.log('Error: Description for current task is required.');
                            promptUser();
                            return;
                        }
                        try{
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
                }catch(error){
                    console.error('Error while editing task:',(error as Error).message);
                    promptUser();
                }
                } 
            );
            });          
        });

        })
        .catch(error => {
            console.error('Error while viewing tasks:', error.message);
            promptUser();
        }); 
        
        

}
function viewTasksPrompt(): void {
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
        } 
    );
}
function getTaskDetails(callback: (description: string, startTime: string, endTime: string, priority: string) => void): void {
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
