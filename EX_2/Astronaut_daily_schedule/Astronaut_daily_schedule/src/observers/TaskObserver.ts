import { Observer } from './observer';

    export class TaskObserver implements Observer {
        update(event: string, taskDescription: string): void {
            console.log(`Task ${event}: ${taskDescription}`);
        }
    }
