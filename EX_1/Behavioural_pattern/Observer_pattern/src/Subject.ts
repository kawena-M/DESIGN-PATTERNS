import { Observer } from './Observer';
export class Subject {
 private observers: Observer[] = [];
 addObserver(observer: Observer): void {
 this.observers.push(observer);
 }
 removeObserver(observer: Observer): void {
 const index = this.observers.indexOf(observer);
 if (index > -1) {
 this.observers.splice(index, 1);
 }
 }
 notify(news: string): void {
 for (const observer of this.observers) {
 observer.update(news);
 }
 }
}