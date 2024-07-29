import * as fs from 'fs';
import * as path from 'path';

export class Logger {
    private static instance: Logger;
    private logFilePath: string;

    private constructor() {
        // Define log file path
        this.logFilePath = path.join(__dirname, '../logs/app.log');

        // Ensure the logs directory exists
        const logDir = path.dirname(this.logFilePath);
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public log(message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage);
        console.log(logMessage);
    }
}
