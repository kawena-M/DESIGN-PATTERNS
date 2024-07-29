import { OldSystem } from './OldSystem';
 import { NewSystem } from './NewSystem';
export class Adapter extends OldSystem {     private newSystem: NewSystem;
    constructor() {         super();
        this.newSystem = new NewSystem();
    }
    oldRequest(): void {
        this.newSystem.newRequest();
    }
}
