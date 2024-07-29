import { Observer } from './Observer';
export class User implements Observer {
 constructor(private name: string) {}
 update(news: string): void {
 console.log(`${this.name} received news: ${news}`);
 }
}