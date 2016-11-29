import {Component, Input, OnInit} from '@angular/core';
import {RunMonth, DateRange, CriteriaRpt, Report, Customer} from '../service/data-transfer-object';
import {getCookie, formatDate} from '../utils/utility-functions';
import {CassReportService} from '../service/cass-report.service';
import {ReportTrackerService} from '../service/report-tracker.service';
import {validate} from '../utils/report-criteria';

@Component({
    templateUrl: 'cass-report.component.html'
})
export class CassReportComponent implements OnInit{
    showSpinning:boolean;
    reportNm: string = "Cass Mail Report";
    runMonth:RunMonth;
    dateRange:DateRange;
    
    criteriaRpt: CriteriaRpt;
    customer: Customer;
    reportPanel: Report;

    constructor(private cassReportSvc: CassReportService,
                private reportTrackerService: ReportTrackerService){
    }

    ngOnInit():void {
        let now = new Date();
        this.runMonth = new RunMonth();
        this.runMonth.monthId = now.getMonth()+"";
        this.runMonth.year = now.getFullYear()+"";

        this.dateRange = new DateRange();
        this.criteriaRpt = new CriteriaRpt();
        this.reportPanel = new Report();
        this.customer = new Customer();
    }

    validateDateRange() {
        //this.isFromDtPatternError = isValidDate(this.dateRange.fromDt);
        //this.isToDtPatternError = isValidDate(this.dateRange.toDt);
    }
    onCustomerNotify(value) {
        this.customer.customerId = value;
    }
    onRunMonthNotify(value) {
        this.runMonth = value;
    }
    onDateRangeNotify(value) {
        this.dateRange = value;
    }
    genExcel(){
        console.log("genExcel...");
    }
    genReport(){
        console.log("genReport...");
        var inputElement = (<HTMLFormElement>document.getElementsByClassName("input_form")[0]);

        if(validate(inputElement)){
            this.setCriteria(inputElement, "Report");
            this.cassReportSvc.sendCriteria(this.criteriaRpt);
            this.reportPanel.initial(this.customer.customerId, this.reportNm, this.criteriaRpt, "processing");
            this.showSpinning = true;
        }
    }

    setCriteria(inputElement, reportType: string){
        var dateType = (<HTMLInputElement>inputElement.elements['dateType']).value; 

        var customerElement = <HTMLSelectElement>inputElement.elements['customerId']; 
        this.customer.customerId =  customerElement.value;
        this.customer.customerName = customerElement.options[customerElement.selectedIndex].textContent.trim();

        if(dateType == "R"){
            this.runMonth.monthId =  (<HTMLSelectElement>inputElement.elements['runMonthSelect']).value; 
            this.runMonth.year = (<HTMLSelectElement>inputElement.elements['runYearSelect']).value;  
            this.dateRange.fromDt = null; 
            this.dateRange.toDt = null;
            this.criteriaRpt.initial(this.reportNm, this.customer, this.dateRange, this.runMonth, reportType, "", "RUN_MONTH");
        }else if(dateType == "F"){
            this.runMonth.monthId =  null; 
            this.runMonth.year = null; 
            this.dateRange.fromDt = formatDate(new Date((<HTMLInputElement>inputElement.elements['fromDt']).value),"yyyy-mm-dd");
            this.dateRange.toDt = formatDate(new Date((<HTMLInputElement>inputElement.elements['toDt']).value),"yyyy-mm-dd");
            this.criteriaRpt.initial(this.reportNm, this.customer, this.dateRange, this.runMonth, reportType, "", "MAILED_DATE");
        }   
    }

    closeSpinning(isClose: boolean){
        this.showSpinning = !isClose;
        this.reportTrackerService.regisReport(this.reportPanel);
    }

}
