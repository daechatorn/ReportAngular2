import {Component, Input, OnInit} from '@angular/core';
import {RunMonth, DateRange, CriteriaRpt, Report, Customer} from '../service/data-transfer-object';
import {getCookie, formatDate, parseStringToDate} from '../utils/utility-functions';
import {ReportExportService} from '../service/report-export.service';
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

    constructor(private reportExportSvc: ReportExportService,
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
        var inputElement = (<HTMLFormElement>document.getElementsByClassName("input_form")[0]);
        if(validate(inputElement)){
            
            this.setCriteria(inputElement, "Excel");
            this.reportExportSvc.generateFile(this, this.criteriaRpt, this.showSpinning);
            
            ///this.reportPanel.initial(response, this.reportNm, this.criteriaRpt, "processing");
            
        }else{
            console.log("Cann't Pass validate");
        }
    }

    genReport(){
        console.log("genReport...");
        var inputElement = (<HTMLFormElement>document.getElementsByClassName("input_form")[0]);
        
        if(validate(inputElement)){
            
            this.setCriteria(inputElement, "Report");
            this.reportExportSvc.generateFile(this, this.criteriaRpt, this.showSpinning);
            
            ///this.reportPanel.initial(response, this.reportNm, this.criteriaRpt, "processing");
            
        }else{
            console.log("Cann't Pass validate");
        }
    }

    setCriteria(inputElement, reportType: string){
        var dateType = (<HTMLInputElement>inputElement.elements['dateType']).value; 
        var reportRange = "";
        var customerElement = <HTMLSelectElement>inputElement.elements['customerId']; 
        this.customer.customerId =  customerElement.value;
        this.customer.customerName = customerElement.options[customerElement.selectedIndex].textContent.trim();

        if(dateType == "R"){
            reportRange = "RUN_MONTH";
            this.runMonth.monthId =  (<HTMLSelectElement>inputElement.elements['runMonthSelect']).value; 
            this.runMonth.year = (<HTMLSelectElement>inputElement.elements['runYearSelect']).value;  
            this.dateRange.fromDt = null; 
            this.dateRange.toDt = null;
        }else if(dateType == "F"){
            reportRange = "MAILED_DATE";
            this.runMonth.monthId =  null; 
            this.runMonth.year = null; 
            this.dateRange.fromDt = new Date((<HTMLInputElement>inputElement.elements['fromDt']).value);
            this.dateRange.toDt = new Date((<HTMLInputElement>inputElement.elements['toDt']).value);
        }   
        this.criteriaRpt.initial(this.reportNm, this.customer, this.dateRange, this.runMonth, reportType, "", reportRange);
    }

    closeSpinning(isClose: boolean){
        this.showSpinning = !isClose;
        this.reportTrackerService.regisReport(this.reportPanel);
    }

}
