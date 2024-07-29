# Creational Patterns: Singleton and Factory

## Overview:
This project demonstrates the implementation of two creational design patterns in TypeScript: the Singleton pattern and the Factory pattern. These patterns are used to manage the creation and lifecycle of objects in a structured and efficient manner.

## Patterns Implemented:
## Factory Pattern
The Factory pattern provides an interface for creating objects without specifying the exact class of object that will be created. This pattern is useful for managing and encapsulating the creation process, especially when the creation process is complex.

## Shape Factory Application

## Overview:
The Shape Factory Application is designed to demonstrate basic principles of object-oriented programming (OOP) and design patterns, specifically the Factory Pattern. It allows users to create and draw shapes based on their input and provides feedback through logging.

## Features:
- Prompts users to input a shape type (circle or square).
- Utilizes the Factory Pattern for shape creation.
- Logs actions and errors using a custom logger.
- Supports creating multiple shapes in a single session.

## SOLID Principles:
*Single Responsibility Principle (SRP)*: Each class in the application has a single responsibility. For example,
ShapeFactory is responsible for creating shapes.
Shape classes (e.g., Circle, Square) are responsible for drawing themselves.
logger handles logging operations.
*Open/Closed Principle (OCP)*: The ShapeFactory class can be extended to support new shapes without modifying existing code. Adding a new shape involves creating a new class that implements the Shape interface and updating the factory.
*Liskov Substitution Principle (LSP)*: The Shape interface and its implementations (Circle, Square) can be substituted for one another. Any instance of Shape should be able to replace another instance without affecting the correctness of the application.
*Interface Segregation Principle (ISP)*: The application does not have large, unwieldy interfaces. Instead, the Shape interface is focused on drawing operations, adhering to ISP.
*Dependency Inversion Principle (DIP)*: High-level modules (e.g., main() function) depend on abstractions (e.g., Shape interface), not on concrete implementations (e.g., Circle or Square).

## Object-Oriented Programming (OOP):
*Encapsulation*: The details of shape creation and drawing are encapsulated within the Shape classes. Users interact with shapes through a common interface.
*Inheritance*: Specific shapes inherit from a base Shape class or interface and implement the draw method.
*Polymorphism*: The Shape interface allows for polymorphic behavior, where different shape types can be used interchangeably.

## Design Patterns:
*Factory Pattern*: The ShapeFactory class creates instances of shapes based on user input. This pattern abstracts the instantiation process, allowing for easy extension and management of different shape types.

## Installation:
1.*Clone the repository*:
git clone <repository-url>
cd <repository-directory>
2.*Install dependencies*:
Make sure you have Node.js and npm installed. Then run:
npm install
## Usage
### Running the Application
npm start
1.*Interact with the application*:
Enter the type of shape you want to create when prompted (circle or square).
The application will draw the shape and log the action.
After drawing, you will be asked if you want to create another shape. Enter yes to continue or no to exit.
2.*Handling errors*:
The application will prompt for re-entry in case of invalid input and will log errors in the logger.

## Singleton Pattern
The Singleton pattern ensures that a class has only one instance and provides a global point of access to that instance. This pattern is useful when exactly one object is needed to coordinate actions across the system.

## Logger Application

## Overview:
The Logger Application demonstrates a basic logging system where users can input messages to be logged. It uses a singleton Logger class to manage log entries and provides a command-line interface (CLI) for user interaction. This application highlights the Singleton Design Pattern and basic error handling in a Node.js environment.

## Features:
Prompts users to input messages.
Uses a singleton Logger class to manage log entries.
Allows users to exit the application by typing "exit".
Provides basic error handling and logging of actions.

## Design Patterns and Principles:
*Singleton Pattern*: The Logger class is implemented as a singleton to ensure that only one instance of the logger exists throughout the application. This pattern is useful for managing shared resources, such as log files or database connections.

## Object-Oriented Principles:
*Encapsulation*: The Logger class encapsulates the details of logging messages. Users interact with the logging functionality without needing to understand its internal workings.
*Responsibility*: The Logger class has a single responsibility: managing log entries. The main() function handles user interaction and delegates logging to the Logger.

## Installation:
1.*Clone the repository*:
git clone <repository-url>
cd <repository-directory>
2.*Install dependencies*:
npm install
## Usage
### Run the application:
npm start
1.*Interact with the application*:
Enter a message when prompted to log it.
Type "exit" to quit the application.
2.*Handling Errors*:
The application includes basic error handling to manage unexpected issues.

## Contributing:
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License:
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact:
For any questions or issues, please contact kawegr05@gmail.com