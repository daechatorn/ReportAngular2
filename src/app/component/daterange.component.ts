import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {leftPadNum, parseStringToDate} from '../utils/utility-functions';
import {DateRange} from '../service/data-transfer-object';

const SEPARATOR: string = "/";

@Component({
    selector: 'daterange',
    template: `
		    	<div class="row">
			    	<div class="col-md-2">From:</div>
			    	<div class="col-md-6">
	    				<input type="date" id="fromDt" name="fromDt" [value]="fromDt" (focusout)="onFromDtChange($event.target.value)" />
			    	</div>
		    	</div>
		    	<div class="row">
			    	<div class="col-md-12">&nbsp;</div>
		    	</div>
		    	<div class="row">
			    	<div class="col-md-2">To:</div>
			    	<div class="col-md-6">
	    				<input type="date" id="toDt" name="toDt" [value]="toDt" (focusout)="onToDtChange($event.target.value)"/>
			    	</div>
		    	</div>
    `
})
export class DaterangeComponent implements OnInit{
	fromDt: Date;
	toDt: Date;
	@Output()
    dateRangeNotification = new EventEmitter<DateRange>();

    ngOnInit():void {
        let now = new Date();
		var month = leftPadNum(now.getMonth(), 2);
		var currentDt = leftPadNum(now.getDate(), 2);
        this.fromDt = parseStringToDate(month + SEPARATOR + "01" + SEPARATOR + now.getFullYear());
		this.toDt =  parseStringToDate(month + SEPARATOR + currentDt + SEPARATOR + now.getFullYear());
    }

	getDateRange(): DateRange {
		var daterange = {"fromDt": this.fromDt, "toDt": this.toDt};
		console.log(daterange);
		return daterange;
	}

	onFromDtChange(value) {
		this.fromDt = value;
		this.dateRangeNotification.emit(this.getDateRange());
	}

	onToDtChange(value) {
		this.toDt = value;
		this.dateRangeNotification.emit(this.getDateRange());
	}

}