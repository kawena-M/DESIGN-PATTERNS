export interface Observer {
    update(event: string, taskDescription: string): void;
}
