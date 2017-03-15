import {Component, Input, OnInit} from '@angular/core';
import {getBaseUrl} from '../utils/utility-functions';

import {HomeComponent} from './home.component';
import {SpinningWaitService} from '../service/spinning-wait.service';

@Component({
    selector: 'spinning-wait',
    template: `
                <style>
                    .spinning{
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        background: transparent;
                        position: fixed;
                        text-align: center;
                        padding-top: 35%;
                    }
                    .loader{
                        color: black;
                        z-index: 900;
                        width: 200px;
                        text-align: center;
                        padding: 20px 0;
                        background-color: #CCC;
                        opacity: 0.8;
                        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=80);
                        border-radius: 2px;
                        -moz-border-radius: 2px;
                        font-weight: 300;
                        top: 50%;
                        left: 50%;
                        position: fixed;
                        margin-top: -9em; /*set to a negative number 1/2 of your height*/
                        margin-left: -9em; /*set to a negative number 1/2 of your width*/
                        display: flex;
                        font-size: large
                    }
                    .loader-text{
                        padding-left: 30px;
                    }
                    .loader-img{
                        padding-left: 10px;
                    }
                    .loader-img > img{
                        width: 80px;
                    }
                </style>
                <div *ngIf="showSpinnerWait">
                    <div class="spinning" >
                        <span class="loader">
                            <div class="loader-text">Loading </div>
                            <div class="loader-img"><img src="{{baseUrl}}assets/image/loading.gif"></div>
                        </span>
                    </div>
                </div>`
})

export class SpinningWaitComponent implements OnInit{

    showSpinnerWait: boolean;
    baseUrl = getBaseUrl();

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