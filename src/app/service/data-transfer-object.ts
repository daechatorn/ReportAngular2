export class Menu {
    eventClass: string;
    sectionDesc: string;
    displayName: string;
    displayDesc: string;
}

export class Customer {
    customerId: string;
    customerName: string;
    level: string;
}

export class RunMonth {
    monthId: Number;
    year: Number;
}

export class DateRange {
    fromDt: string;
    toDt: string;
}

export class CriteriaRpt {
    reportNm: string;
    customerId: string;
    fromDt: string;
    toDt: string;
    runMonth: string;
}

export class Report {
    reportId: string;
    reportNm: string;
    lastChecked: string;
    status: string;
}