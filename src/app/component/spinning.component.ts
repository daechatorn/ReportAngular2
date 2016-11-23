import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';

@Component({
    selector: 'spinning',
    template: `<div id="loadReport" *ngIf="showSpin">
                <div id="spinningState">
                    <img src="../../../public/image/Report-Activity-Graphic_BR-172x182.gif" />
                    <div id="spinningStateText">
                            Your report is currently processing. 
                            Last checked at 11/21/2016 00:04:44 PST Pacific Time. 
                            You may close this window and retrieve your report at a later time 
                            using the Customer Portal Report Queue page. 
                    </div>
                    <div id="spinningStateButton">
                        <button (click)='closeSpinning()' style="width:100px;"> Save for later </button>
                    </div>
                </div>
            </div>`,
})

export class SpinningComponent{

    @Input() showSpin: boolean;
    @Output() closeSpin = new EventEmitter();

    closeSpinning(): void{
        this.closeSpin.emit(true);
    }

}