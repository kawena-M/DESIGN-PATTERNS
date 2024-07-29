## BEHAVIOURAL PATTERN - OBSERVER PATTERN AND STRATEGY PATTERN

## OBSERVER PATTERN

### News Agency Application
## Overview
The News Agency Application is a command-line interface (CLI) tool that simulates a news agency system where users can be added or removed, and news can be published. The application uses the Observer Pattern to manage user subscriptions and notifications. Users interact with the system through a CLI, and the application logs actions and errors.

## Features
- Allows adding and removing users.
- Enables publishing news updates to all subscribed users.
- Utilizes the Observer Pattern to manage user subscriptions.
- Logs actions and errors using a custom logger.
- Provides a CLI for user interaction and menu selection.
- Design Patterns and Principles

## Design Pattern
*Observer Pattern*: The NewsAgency class acts as the subject (or observable), and the User class acts as observers. The pattern allows multiple users to subscribe to news updates and be notified whenever news is published.

## Object-Oriented Principles
*Encapsulation*: The NewsAgency and User classes encapsulate the details of news publishing and user management. Users interact with the system through defined methods.
*Composition*: The NewsAgency class manages a list of User instances and updates them with published news.

## Code Components
- *NewsAgency Class*: Manages the list of observers (users) and publishes news updates.
- *User Class*: Represents a user who subscribes to news updates.
- *logger*: Custom logger for recording actions and errors.
- *askQuestion() Function*: Helper function for reading user input from the command line.
- *addUser() Function*: Prompts for a user name and adds the user to the agency.
- *removeUser() Function*: Prompts for a user name and removes the user from the agency.
- *publishNews() Function*: Prompts for news content and publishes it to all subscribed users.
- *mainMenu() Function*: Displays the main menu and handles user choices.

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
- *Add User*: Choose option 1 to add a new user. Enter the user name when prompted.
- *Remove User*: Choose option 2 to remove a user. Enter the user name to be removed.
- *Publish News*: Choose option 3 to publish news. Enter the news content to be published.
- *Exit*: Choose option 4 to exit the application.
3.*Handling Errors*:
The application includes basic error handling to manage invalid input and unexpected issues. Errors are logged using the logger.


## STRATEGY PATTERN

## Shopping Cart Application
## Overview
The Shopping Cart Application is a command-line interface (CLI) tool that allows users to create a shopping cart, add items, and choose a payment method using the Strategy Pattern. The application provides options for payment via credit card or PayPal and handles errors and logging for user actions.

## Features
- Allows users to add multiple items to a shopping cart.
- Supports two payment methods: Credit Card and PayPal.
- Uses the Strategy Pattern to handle different payment methods.
- Logs actions and errors using a custom logger.
- Provides a CLI for user interaction and shopping continuation.

## Design Patterns and Principles
- *Strategy Pattern*: The CreditCardStrategy and PayPalStrategy classes define different payment methods. The ShoppingCart class uses a strategy object to process payments, allowing for flexible payment method handling.

## Object-Oriented Principles
*Encapsulation*: The ShoppingCart class encapsulates the details of the cart and payment processing. The Item class encapsulates item details (name and price).
*Composition*: The ShoppingCart class is composed of Item instances and a payment strategy, enabling dynamic behavior based on user choices.

## Code Components
- *Item Class*: Represents an item in the shopping cart with a name and price.
- *ShoppingCart Class*: Manages items in the cart and processes payment using a provided strategy.
- *CreditCardStrategy Class*: Implements credit card payment processing.
- *PayPalStrategy Class*: Implements PayPal payment processing.
- *logger*: Custom logger for recording actions and errors.
- *askQuestion() Function*: Helper function for reading user input from the command line.
- *getItemFromUser() Function*: Prompts for item details and adds them to the cart.
- *getPaymentStrategyFromUser() Function*: Prompts for a payment method and returns the appropriate payment strategy.
- *toContinue() Function*: Prompts to continue shopping or exit the application.
- *main() Function*: Manages the main workflow of the application, including item addition, payment strategy selection, and checkout.

## Installation
1.*Clone the repository*:
git clone <repository-url>
cd <repository-directory>
2.*Install dependencies*:
Make sure you have Node.js and npm installed. Then run:
npm install
## Usage
### Run the application:

1.*Start the application by executing*:
npm start
2.*Interact with the application*:
- *Add Items*: Enter the item name and price when prompted. Continue adding more items or proceed to payment.
- *Select Payment Method*: Choose between CreditCard and PayPal as the payment method.
- *Checkout*: The application processes the payment and displays the result.
- *Continue Shopping*: Choose to continue shopping or exit the application after checkout.
3.*Handling Errors*:
The application includes error handling for invalid input and unexpected issues. Errors are logged using the logger.

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or issues, please contact kawegr05@gmail.com.