import { Shape } from './Shape'; 
import { Circle } from './Circle';
 import { Square } from './Square';
export class ShapeFactory {
    static createShape(type: string): Shape {      
        switch (type) {   
            case 'circle':
                return new Circle();       
            case 'square':        
                 return new Square(); 
             default:      
                 throw new Error('Invalid shape type');
        }
    }
}
