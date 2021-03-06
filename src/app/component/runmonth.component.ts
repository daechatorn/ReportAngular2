import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {RunMonth} from '../service/data-transfer-object';
class Month {
    monthId: string;
    monthName: string
}



@Component({
    selector: 'runmonth',
    template: `
        <select name="runMonthSelect" id="runMonthSelect" (change)="onMonthChange($event.target.value)">
            <option *ngFor="let month of months" [value]="month.monthId" [selected]="month.monthId == monthSelected">{{month.monthName}}</option>
        </select>
        <select name="runYearSelect" id="runYearSelect" (change)="onYearChange($event.target.value)">
            <option *ngFor="let year of years" [value]="year" [selected]="year == yearSelected">{{year}}</option>
        </select>
    `
})
export class RunMonthComponent implements OnInit{
    months: Month[];
    years: Number[];
    monthSelected: string;
    yearSelected: string;
    @Output()
    runMonthNotification = new EventEmitter<RunMonth>();

    ngOnInit():void {
        this.months = [{'monthId': '01', 'monthName': 'Jan'}, {'monthId': '02', 'monthName': 'Feb'},
                       {'monthId': '03', 'monthName': 'Mar'}, {'monthId': '04', 'monthName': 'Apr'},
                       {'monthId': '05', 'monthName': 'May'}, {'monthId': '06', 'monthName': 'Jun'},
                       {'monthId': '07', 'monthName': 'Jul'}, {'monthId': '08', 'monthName': 'Aug'},
                       {'monthId': '09', 'monthName': 'Sep'}, {'monthId': '10', 'monthName': 'Oct'},
                       {'monthId': '11', 'monthName': 'Nov'}, {'monthId': '12', 'monthName': 'Dec'}];
        let currentYear = new Date().getFullYear();
        this.years = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1 ];
        this.yearSelected = currentYear+"";
        this.monthSelected = (new Date().getMonth())+"";
    }
    getRunMonthValue(): RunMonth {
        var runMonth = {"monthId": this.monthSelected, "year": this.yearSelected};
        return runMonth;
    }
    onMonthChange(value) {
        this.monthSelected = value;
        var runMonth = this.getRunMonthValue();
        this.runMonthNotification.emit(runMonth);
    }
    onYearChange(value) {
        this.yearSelected = value;
        var runMonth = this.getRunMonthValue();
        this.runMonthNotification.emit(runMonth);
    }
}