import {Injectable} from '@angular/core';

import {Report} from './data-transfer-object';

@Injectable()
export class ReportTrackerService{

    static instance:ReportTrackerService;
    reportsPanelList: Report[];
    sessionStorageNm: string = "reportTracker";

    constructor(){
        this.reportsPanelList = [];
    }

    getReports(): Promise<Report[]> {
         var reportTracker = JSON.parse(window.sessionStorage.getItem(this.sessionStorageNm));
         if(reportTracker != null){
            this.reportsPanelList =  reportTracker;
         }else{
             this.reportsPanelList = [];
         }
         return Promise.resolve(this.reportsPanelList);
    }
 
    regisReport(report:Report): void{
        if(report != null){
            this.reportsPanelList.splice(0, 0, report);
            window.sessionStorage.setItem(this.sessionStorageNm, JSON.stringify(this.reportsPanelList));
        }else{
            console.log("Please check your report ::: report is null");
        }
        
    }
    

}
