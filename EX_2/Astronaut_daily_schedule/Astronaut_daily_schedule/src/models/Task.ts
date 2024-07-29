export class Task {
    constructor(
        public description: string,
        public startTime: Date,
        public endTime: Date,
        public priority: string,
        public status:boolean
    ) {}
}

