import { Subject } from './Subject';
import logger from './utils/logger';
export class NewsAgency extends Subject {
 publishNews(news: string): void {
logger.warn(`News Published: ${news}`);
 console.log(`News Published: ${news}`);
 this.notify(news);
 }
}