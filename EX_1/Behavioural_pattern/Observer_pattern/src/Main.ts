import { NewsAgency } from './NewsAgency';
import { User } from './User';
import * as readline from 'readline';
import logger from './utils/logger';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const agency = new NewsAgency();

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function addUser() {
  try {
    const name = await askQuestion('Enter user name: ');
    if (!name.trim()) throw new Error('User name cannot be empty.');
    const user = new User(name);
    agency.addObserver(user);
    logger.warn(`${name} has been added as a user.`);
    console.log(`${name} has been added as a user.`);
  } catch (error) {
    logger.warn((error as Error).message);
    console.error((error as Error).message);
  }
  mainMenu();
}

async function removeUser() {
  try {
    const name = await askQuestion('Enter user name to remove: ');
    if (!name.trim()) throw new Error('User name cannot be empty.');
    const users = agency['observers'] as User[];
    const user = users.find(user => user['name'] === name);
    if (!user) throw new Error('User not found.');
    agency.removeObserver(user);
    logger.warn(`${name} has been removed.`);
    console.log(`${name} has been removed.`);
  } catch (error) {
    logger.warn((error as Error).message);
    console.error((error as Error).message);
  }
  mainMenu();
}

async function publishNews() {
  try {
    const news = await askQuestion('Enter news to publish: ');
    if (!news.trim()) throw new Error('News cannot be empty.');
    agency.publishNews(news);
  } catch (error) {
    logger.warn((error as Error).message);
    console.error((error as Error).message);
  }
  mainMenu();
}

async function mainMenu() {
  console.log('\nMain Menu');
  console.log('1. Add User');
  console.log('2. Remove User');
  console.log('3. Publish News');
  console.log('4. Exit');

  const choice = await askQuestion('Select an option: ');

  switch (choice) {
    case '1':
      await addUser();
      break;
    case '2':
      await removeUser();
      break;
    case '3':
      await publishNews();
      break;
    case '4':
      rl.close();
      break;
    default:
      console.log('Invalid choice, please select again.');
      mainMenu();
      break;
  }
}

console.log('Welcome to the News Agency Application');
mainMenu();