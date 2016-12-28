import {Component, Input, OnInit} from '@angular/core';
import {RunMonth, DateRange, CriteriaRpt, Report, Customer, Facility} from '../service/data-transfer-object';
import {getCookie, formatDate, parseStringToDate} from '../utils/utility-functions';
import {ReportExportService} from '../service/report-export.service';
import {ReportTrackerService} from '../service/report-tracker.service';
import {validate} from '../utils/report-criteria';

@Component({
    templateUrl: 'carrierpostage-report.component.html'
})
export class CarrierReportComponent implements OnInit{
    showSpinning:boolean;
    reportNm: string = "Carrier Postage Report";
    runMonth:RunMonth;
    dateRange:DateRange;
    
    criteriaRpt: CriteriaRpt;
    customer: Customer;
    facility: Facility;
    reportPanel: Report;

    inputElement;

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
        this.facility = new Facility();
        this.inputElement = (<HTMLFormElement>document.getElementsByClassName("input_form")[0]);
        
        var customerElement = <HTMLSelectElement>this.inputElement.elements['customerId']; 
        this.customer.customerId =  customerElement.value;
        this.customer.customerName = customerElement.options[customerElement.selectedIndex].textContent.trim();
    }
    onCustomerNotify(value) {
        this.ngOnInit();
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

        if(validate(this.inputElement)){
            this.setCriteria(this.inputElement, "Report");
            this.reportExportSvc.sendCriteria(this.criteriaRpt);
            this.reportPanel.initial(this.customer.customerId, this.reportNm, this.criteriaRpt, "processing");
            this.showSpinning = true;
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

        var facilityElement = <HTMLSelectElement>inputElement.elements['facility'];
        this.facility.facilityCd = facilityElement.value;
        this.facility.facilityName = facilityElement.options[facilityElement.selectedIndex].textContent.trim();

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
        this.criteriaRpt.initial(this.reportNm, this.customer, this.dateRange, this.runMonth, reportType, this.facility.facilityCd, reportRange);
    }

    closeSpinning(isClose: boolean){
        this.showSpinning = !isClose;
        this.reportTrackerService.regisReport(this.reportPanel);
    }

}
