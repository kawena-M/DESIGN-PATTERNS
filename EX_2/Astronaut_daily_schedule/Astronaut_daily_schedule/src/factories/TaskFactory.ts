import { Task } from '../models/Task';
import logger from '../utils/logger';

export class TaskFactory {
    static createTask(description: string, startTime: string, endTime: string, priority: string,status: boolean = false): Task {
        if (!description.trim()|| !startTime.trim() || !endTime.trim() || !priority.trim()) {
            throw new Error('Invalid input: Description, start time, end time, and priority are required.');
        }
        if (!isValidTimeFormat(startTime) || !isValidTimeFormat(endTime)) {
            logger.warn('Invalid time format provided.');
            throw new Error('Invalid time format. Use 24 hours format.');
        }
        if( new Date(1970-01-01T${startTime}:00) >= new Date(1970-01-01T${endTime}:00)){
            logger.warn('Invalid start time and end time provided.');
            throw new Error('Start time must be before end time.');
        }
        if (!['High', 'Medium', 'Low'].includes(priority)) {
            logger.warn('Invalid priority provided.');
            throw new Error('Invalid priority: Valid values are High, Medium, or Low.');
        }
 return new Task(description, new Date(1970-01-01T${startTime}:00), new Date(1970-01-01T${endTime}:00), priority,status);
    }
}

function isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(time);
}