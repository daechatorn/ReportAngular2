import {formatDate} from '../utils/utility-functions';

export class Menu {
    eventClass: string;
    sectionDesc: string;
    displayName: string;
    displayDesc: string;
}

export class Facility {
    facilityCd: string;
    facilityName: string;
}

export class Customer {
    customerId: string;
    customerName: string;
    level: string;
}

export class RunMonth {
    monthId: string;
    year: string;
}

export class DateRange {
    fromDt: Date;
    toDt: Date;
}

export class CriteriaRpt {
    reportNm: string;
    customerId: string;
    customerName: string;
    fromDt: Date;
    toDt: Date;
    runMonth: string;
    runYear: string;
    reportType: string;
    facilityCd: string;
    reportRange: string;

    initial(reportNm, customer: Customer, dateRange: DateRange,runMonthsSelected: RunMonth, reportType, facilityCd, reportRange){
        this.fromDt = dateRange.fromDt;             this.toDt = dateRange.toDt;   
        this.runMonth = runMonthsSelected.monthId;  this.runYear = runMonthsSelected.year;
        this.reportRange = reportRange;             this.reportNm = reportNm;    
        this.customerId = customer.customerId;      this.customerName = customer.customerName;  
        this.reportType = reportType;               this.facilityCd = facilityCd;              
    }
}

export class Report {
    reportId: string;
    criteriaRpt: CriteriaRpt;
    generateOn: string;
    lastChecked: string;
    status: string;

    initial(reportId, reportNm, criteriaRpt, status){
        var date = new Date();
        var generateOn = formatDate(date, 'yyyymmddhhmmss');
        var lastChecked = formatDate(date, 'MM/dd/yyyy HH:mm:ss');

        this.reportId = reportId;           this.criteriaRpt = criteriaRpt;     
        this.generateOn = generateOn;       this.lastChecked = lastChecked;     
        this.status = status;
    }
}

export class BreadCrumb {
    level: number;
    pageNm: string;
    pageUrl: string;
}