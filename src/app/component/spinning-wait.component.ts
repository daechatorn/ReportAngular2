import {Component, Input, OnInit} from '@angular/core';
import {getBaseUrl} from '../utils/utility-functions';

import {HomeComponent} from './home.component';
import {SpinningWaitService} from '../service/spinning-wait.service';

@Component({
    selector: 'spinning-wait',
    templateUrl: 'spinning-wait.component.html'
})

export class SpinningWaitComponent implements OnInit{

    showSpinnerWait: boolean;

    ngOnInit(){
        var spinning = SpinningWaitService.getInstance();
        this.showSpinnerWait = spinning.getShowSpinnerWait();

        spinning.showSpinnerWaitUpdated.subscribe(
            (showSpinnerWait) => {
                this.showSpinnerWait = spinning.getShowSpinnerWait();
            }
        );
    }

}