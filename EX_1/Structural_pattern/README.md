# STRUCTURAL PATTERN - ADAPTER  PATTERN AND DECORATOR PATTERN

## ADAPTER PATTERN
The Adapter Pattern is a structural design pattern that allows objects with incompatible interfaces to work together. It acts as a bridge between two incompatible interfaces by converting the interface of a class into another interface that a client expects.

## Command Handling Application
## Overview
This project is a command-line application demonstrating the use of the Adapter Pattern to handle and process commands. The application interacts with users through a command-line interface (CLI) and uses a logger to manage and record operations. This example showcases error handling and user interaction in a Node.js environment.

## Features
- Prompts users to input commands.
- Utilizes an Adapter class to handle specific commands.
- Logs actions and errors using a custom logger.
- Supports exiting the application or processing a predefined command.
 
## Design Patterns and Principles

-*Adapter Pattern*: The Adapter class is used to adapt an existing interface to a new interface expected by the application. In this case, the Adapter class provides an interface for handling the oldRequest command.

## Object-Oriented Principles
*Encapsulation*: The Adapter class encapsulates the details of the oldRequest operation. Users interact with the command handling system without needing to understand its internal workings.
*Responsibility*: The Adapter class has a single responsibility: handling the oldRequest operation. The handleCommand function manages user commands and delegates to the Adapter.

## Installation
1.*Clone the repository*:
git clone <repository-url>
cd <repository-directory>
2.*Install dependencies*:
Make sure you have Node.js and npm installed. Then run:
npm install
### Usage
## Run the application:

1.*Start the application by executing*:
npm start
2.*Interact with the application*:
- Command Input: Enter oldRequest to process a predefined request using the Adapter class.
- Exit Command: Enter exit to terminate the application.
3.*Handling Errors*:
The application includes basic error handling to manage unexpected issues and logs errors using the logger.

## DECORATOR PATTERN
The Decorator Pattern is a structural design pattern that allows behavior to be added to individual objects, either statically or dynamically, without affecting the behavior of other objects from the same class. This pattern is particularly useful for adhering to the Open/Closed Principle, as it allows for the extension of an object's behavior without modifying the original code.

## Coffee Decorator Application
## Overview
This project demonstrates the use of the Decorator Pattern to add functionalities to a base object dynamically. In this example, the application allows users to customize a coffee order by adding milk and sugar. The program uses a command-line interface (CLI) to interact with users and a logger to manage and record operations.

## Features
- Allows users to create a basic coffee order.
- Supports adding milk and/or sugar to the coffee using decorators.
- Logs actions and errors using a custom logger.
- Displays the final coffee description and total cost.
- Design Patterns and Principles

## Decorator Pattern
*Decorator Pattern*: The MilkDecorator and SugarDecorator classes extend the functionality of the SimpleCoffee class without modifying its structure. They allow additional features (milk and sugar) to be added dynamically to the coffee.

## Object-Oriented Principles
*Encapsulation*: The SimpleCoffee and decorator classes encapsulate the details of coffee preparation and customization. Users interact with the coffee through a common interface.
*Composition*: The MilkDecorator and SugarDecorator classes use composition to add functionality to the SimpleCoffee instance.

## Code Components
- *SimpleCoffee Class*: Represents the base coffee with a default description and cost.
- *Coffee Interface*: Provides a common interface for coffee-related operations.
- *MilkDecorator Class*: Adds milk to the coffee and adjusts the description and cost.
- *SugarDecorator Class*: Adds sugar to the coffee and adjusts the description and cost.
- *logger*: Custom logger for recording actions and errors.
- *askQuestion() Function*: Helper function for reading user input from the command line.
- *main() Function*: Manages the user interaction, coffee customization, and logging.

## Installation
1.*Clone the repository*:
git clone <repository-url>
cd <repository-directory>
2.*Install dependencies*:
npm install
Usage
3.*Run the application*:
*Start the application by executing*:
npm start
*Interact with the application*:
- *Basic Coffee*: The application initially creates a basic coffee and displays its description and cost.
- *Add Milk*: Respond with yes to add milk to your coffee. The updated coffee description and cost will be displayed.
- *Add Sugar*: Respond with yes to add sugar to your coffee. The updated coffee description and cost will be displayed.
- *Final Output*: The application will show the final coffee description and total cost.
*Handling Errors*:
The application includes basic error handling to manage unexpected issues and logs errors using the logger.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or issues, please contact kawegr05@gmail.com.