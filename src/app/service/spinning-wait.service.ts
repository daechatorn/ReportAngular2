import {Injectable, EventEmitter} from '@angular/core';

import {BreadCrumb} from './data-transfer-object';

@Injectable()
export class SpinningWaitService {
    private static _instance: SpinningWaitService = new SpinningWaitService();

    showSpinnerWait:boolean;
    showSpinnerWaitUpdated = new EventEmitter();
    
    constructor() {
        if(SpinningWaitService._instance !== undefined) {
            throw new TypeError("This class is defined as a Singleton, please use getInstance instead of constructing a new object.");
        }

        SpinningWaitService._instance = this;
        this.showSpinnerWait = true;
    }

    public static getInstance(): SpinningWaitService {
        return SpinningWaitService._instance;
    } 

    public isFinishLoad(status): void{
        this.showSpinnerWait = !status;
        this.showSpinnerWaitUpdated.emit(this.showSpinnerWait); //check show spinning was changed
    }
    
    public getShowSpinnerWait(): boolean{
        return this.showSpinnerWait;
    }

}
