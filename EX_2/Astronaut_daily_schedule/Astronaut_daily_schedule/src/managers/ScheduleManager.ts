import { Task } from '../models/Task';
import { TaskFactory } from '../factories/TaskFactory';
import { Subject } from '../observers/Subject';
import { retry } from '../utils/retry';
import logger from '../utils/logger';

export class ScheduleManager  extends Subject{
    private static instance: ScheduleManager;
    private tasks: Task[] = [];

    private constructor() {
        super();
    }

    static getInstance(): ScheduleManager {
        if (!ScheduleManager.instance) {
            ScheduleManager.instance = new ScheduleManager();
        }
        return ScheduleManager.instance;
    }

    async addTask(task: Task): Promise<string> {
        return retry(async () => {
            try{
            for (const existingTask of this.tasks) {
                if (this.isConflict(existingTask, task)) {
                    logger.warn(`Conflict with existing task ${existingTask.description} while adding ${task.description}`);
                    this.notify('Conflict with existing task ', existingTask.description);
                    return `Error: Task conflicts with existing task "${existingTask.description}".`;
                }
            }
            
            this.tasks.push(task);
            this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
            logger.warn(`Task ${task.description} added successfully with no conflicts.`);
            this.notify('add', task.description);
            return `Task added successfully. No conflicts.`;
        } catch (error) {
            logger.warn('Error: Failed to add task.');
            return 'Error: Failed to add task. Please try again.';
        }
    });
    }

    async removeTask(description: string): Promise<string> {
        return retry(async () => {
        try {
            const index = this.tasks.findIndex(task => task.description === description);
            if (index === -1) {
                logger.warn(`Error: Task not Found while removing ${description}`);
                return `Error: Task not found while removing.`;
            }
            this.tasks.splice(index, 1);
            logger.warn(`Task removed successfully ${description}`);
            this.notify('remove', description);
            return `Task removed successfully.`;
        } catch (error) {
            logger.warn(`Failed to remove task ${description}`);
            return 'Error: Failed to remove task. Please try again.';
        }
    });
    }

    async editTask(description: string, newDescription: string, newStartTime: string, newEndTime: string, newPriority: string,newStatus:boolean): Promise<string> {
        return retry(async () => {
        try {
            const index = this.tasks.findIndex(task => task.description === description);
            if (index === -1) {
                logger.warn(`Error: Task ${description} not Found while editing.`);
                return `Error: Task not found .`;
            }
            let updatedTask:Task;
            if(!newDescription.trim() && !newStartTime.trim() && !newEndTime.trim() && !newPriority.trim()){
                this.tasks[index].status = newStatus;
                logger.warn(`Task: ${this.tasks[index].description} updated successfully`);
                this.notify('edit', description);
                return `Task updated successfully.`;
            }
            if(!newDescription.trim()){
                updatedTask = TaskFactory.createTask(description, newStartTime, newEndTime, newPriority,newStatus);
            }
            else{
                updatedTask = TaskFactory.createTask(newDescription, newStartTime, newEndTime, newPriority,newStatus);
            }
            for (const existingTask of this.tasks) {
                if (this.isConflict(existingTask, updatedTask )&& existingTask.description!==updatedTask.description) {
                    logger.warn('Conflict with existing task while adding', existingTask.description);
                    this.notify('Task Conflict with existing task while adding newtask', existingTask.description);
                    return `Error: Task conflicts with existing task "${existingTask.description}".`;
                }
            }

            this.tasks[index] = updatedTask;
            this.tasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
            this.notify('edit', newDescription || description);
            logger.warn(`Task: ${this.tasks[index].description} updated successfully`);
            return `Task updated successfully.`;
        } catch (error) {
            logger.warn(`Task: ${description} not updated`);
            return 'Error: Failed to edit task. Please try again.';
        }
    });
    }

    async viewTasks(priority: string): Promise<string> {
        return retry(async () => {
        try {
            if (!['High', 'Medium', 'Low',''].includes(priority)) {
                logger.warn('Invalid priority: Valid values are High, Medium, or Low.')
                throw new Error('Invalid priority: Valid values are High, Medium, or Low.');
            }
            const filteredTasks = priority 
                ? this.tasks.filter(task => task.priority === priority)
                : this.tasks;

            if (filteredTasks.length === 0) {
                logger.warn('No Task Scheduled for a day.')
                throw new Error('No Task Scheduled for a day.');
            }

            return filteredTasks.map(task => 
                `${task.startTime.toTimeString().slice(0, 5)} - ${task.endTime.toTimeString().slice(0, 5)}: ${task.description} [${task.priority}] Status:${task.status}`
            ).join('\n');
        } catch (error) {
            return (error as Error).message;
        }
    });
    }

    private isConflict(task1: Task, task2: Task): boolean {
        return (task1.startTime < task2.endTime) && (task2.startTime < task1.endTime);
    }
}

