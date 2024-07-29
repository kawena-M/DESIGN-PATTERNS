## Astronaut Daily Schedule Organizer

## Overview:
The Astronaut Daily Schedule Organizer is a comprehensive application designed to manage the daily tasks and schedules of astronauts. This tool allows astronauts to efficiently organize their tasks, set priorities, and ensure timely completion of their activities. The application supports adding, removing, and editing tasks, and provides a visual representation of the daily schedule.

## Features:
-*Add Task*: Create a new task with a description, start time, end time, priority, and status.
-*Remove Task*: Delete an existing task from the schedule.
-*Edit Task*: Modify the details of an existing task.
-*View Tasks*: Display all tasks for the day.
-*Logging*: Track application usage and errors in a log file.

## Technologies Used:
1.*TypeScript*: Strongly-typed programming language that builds on JavaScript.
2.*Readline*: Node.js module to create interactive command-line interfaces.

## Design Patterns: 
Singleton, Factory, Observer

## SOLID Principles: 
Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

## Design Patterns:
1.*Singleton Pattern*
The Logger class implements the Singleton pattern to ensure that there is only one instance of the logger throughout the application. This provides a centralized point for logging messages and errors.
2.*Factory Pattern*
TaskFactory: Creates instances of tasks based on the provided parameters. This pattern is used to encapsulate the creation logic and promote code reuse.
3.*Observer Pattern*
The Observer pattern is used to notify observers (such as the TaskObserver) when the schedule is updated. This allows different parts of the application to react to changes in the schedule without tightly coupling them together.

## SOLID Principles:
1.*Single Responsibility Principle (SRP)*
Each class in the application has a single responsibility. For example, the ScheduleManager class handles task management, while the Logger class handles logging.
2.*Open/Closed Principle (OCP)*
The application is designed to be open for extension but closed for modification. This means new functionality can be added by extending existing classes without changing their code. For instance, new types of tasks or logging mechanisms can be added without modifying the core classes.
3.*Liskov Substitution Principle (LSP)*
Subclasses can replace their parent classes without affecting the application's functionality. For example, any class that implements the Task interface can be used wherever a Task object is expected.
4.*Interface Segregation Principle (ISP)*
The application uses specific interfaces, so classes are not forced to implement methods they do not use. For example, different task types or logging mechanisms only need to implement relevant interfaces.
5.*Dependency Inversion Principle (DIP)*
The application depends on abstractions (interfaces) rather than concrete implementations. This allows for greater flexibility and easier testing. For example, the ScheduleManager class depends on a Task interface rather than a specific task implementation.

## Object-Oriented Programming (OOP) Concepts:
1.*Encapsulation*
Data and methods are encapsulated within classes, protecting the internal state and providing a clear interface for interaction. For example, the Task class encapsulates task details and provides methods to access and modify them.
2.*Abstraction*
The application abstracts complex implementation details behind simple interfaces, making it easier to use and extend. For example, the Logger class provides a simple interface for logging messages, hiding the details of file handling.
3.*Inheritance*
The application uses inheritance to promote code reuse. For example,we can notify the users by deriving ScheduleMAnager class from the parent class that is Subject by accessing its members and methods.

## Installation:
1.*Clone the repository*:
git clone https://github.com/your-username/astronaut-daily-schedule-organizer.git
cd astronaut-daily-schedule-organizer
2.*Install dependencies*:
npm install
3.*Build the project*:
npx tsc
4.*Run the application*:
node dist/Main.js

## Usage:
Follow the on-screen prompts to manage the daily schedule. You can add, remove, edit, and view tasks using simple command-line inputs.

## Logging:
Logs are stored in logs/app.log, tracking application usage and errors for analysis. This helps in monitoring the application's performance and diagnosing issues.

## Future Enhancements:
1.Web Interface: Develop a web-based interface for easier access.
2.Notifications: Implement reminders for upcoming tasks.
3.Data Persistence: Save tasks to a database for long-term storage.