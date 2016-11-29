import {Component, Input, OnInit} from '@angular/core';
import {RunMonth, DateRange, CriteriaRpt} from '../service/data-transfer-object';
import {isValidDate, getCookie} from '../utils/utility-functions';
import {CassReportService} from '../service/cass-report.service';


@Component({
    templateUrl: 'cass-report.component.html'
})
export class CassReportComponent implements OnInit {
    showSpinning:boolean;
    customerId:string;
    runMonth:RunMonth;
    dateRange:DateRange;
    isFromDtPatternError:boolean;
    isToDtPatternError:boolean;

    constructor(private cassReportSvc: CassReportService){

    }
    
    ngOnInit():void {
        let now = new Date();
        this.runMonth = new RunMonth();
        this.runMonth.monthId = now.getMonth();
        this.runMonth.year = now.getFullYear();
    }

    validateDateRange() {
        this.isFromDtPatternError = isValidDate(this.dateRange.fromDt);
        this.isToDtPatternError = isValidDate(this.dateRange.toDt);
    }
    onCustomerNotify(value) {
        this.customerId = value;
    }
    onRunMonthNotify(value) {
        this.runMonth = value;
    }
    onDateRangeNotify(value) {
        this.dateRange = value;
        this.validateDateRange();
    }
    genExcel(){
        console.log("genExcel...");
        var criteria = new CriteriaRpt();
        criteria.customerId= "12345";
        criteria.fromDt = "01/01/2014";
        criteria.reportNm = "CASS REPORT";
        this.showSpinning = true;
        this.cassReportSvc.sendCriteria(criteria);
    }
    genReport(){
        console.log("genReport...");
        this.showSpinning = true;
    }
    closeSpinning(isClose: boolean){
        this.showSpinning = !isClose;
    }

}