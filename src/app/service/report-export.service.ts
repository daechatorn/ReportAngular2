import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {getCookie, getAppCfg} from '../utils/utility-functions';

import {Observable} from 'rxjs/Rx';
import {CriteriaRpt} from './data-transfer-object';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()   
export class ReportExportService {
    
    constructor (private http: Http) {}
    private url = getAppCfg().POSTAL_REPORT_URL + "prservice/reports";
    private reportId: string = "";
    private status: string = "";
    private MSG_COMPLETE_GENERATE_REPORT: string = "Generate report was completed.";
    private MSG_ERROR_GENERATE_REPORT: string = "Generate report was failed. Please contact DICE Team.";

    sendCriteria(criteria: CriteriaRpt): Observable<any>{
        let body = JSON.stringify(criteria);
        let token = getCookie("web_session_id");
        let headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({
            headers: headers
        });
        console.log("send report:" + body);
        console.log("host:" + window.location.hostname);
        
        return this.http.post(this.url, body, options)
                 .map((res:Response) => res.json())
                 .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
            
    }
    
    checkReportStatus(reportId: string): Observable<any> {

        var result = "";
      
        let token = getCookie("web_session_id"); 
        let headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({
            headers: headers
        });
        var url = this.url+'/'+reportId+'/status';

        return this.http.get(url,options)
                    .map((res:Response) => res.json());
        
    }

    getReportCrystalURL(reportId: string): Observable<any>{
        var result = "";

        let token = getCookie("web_session_id"); 
        let headers = new Headers({ 'Content-Type': 'application/json'});
        var options = new RequestOptions({
            headers: headers
        });
        var url = this.url+'/'+reportId+'/rpt';

        return this.http.get(url,options)
                    .map((res:Response) => res.json());
    }
    
    generateReport(caller, reportId: string): void{
        this.getReportCrystalURL(reportId)
                            .subscribe(
                                response => {
                                    var url = response.url;
                                    var win = window.open(url, "_blank");
                                    win.document.body.innerHTML = "Loading...";
                                    throw("Generate report was completed.");
                                }
                            );
    }
    
    generateExcel(caller, reportId: string): void{
        var path = this.url+'/'+reportId+'/csv';
        var linkElement = document.createElement('a');
        try {
           
            linkElement.setAttribute('href', path);
            linkElement.setAttribute("download", 'filename');
 
            var clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });

            linkElement.dispatchEvent(clickEvent);

        } catch (ex) {
            console.log(ex);
        }

        console.log("Downloaded excel..."+reportId);
    }
    
    generateFile(caller, criteriaRpt: CriteriaRpt, showSpinning: boolean): void{
        caller.showSpinning = true;
        this.sendCriteria(criteriaRpt)
            .map( res => {
                this.reportId = res.reportId;
                return this.reportId;
            })
            .flatMap((reportId) => {
                return Observable
                    .interval(5000)
                    .flatMap(() => {
                        var result = this.checkReportStatus(reportId);
                        return result;
                    });
            })
            .subscribe(response => {
                var status = response.status;
                if(status == "complete"){
                    if(criteriaRpt.reportType == "Report"){
                        this.generateReport(caller, this.reportId);
                    }else if(criteriaRpt.reportType == "Excel"){
                        this.generateExcel(caller, this.reportId);
                    }
                    console.log("complete");
                    caller.showSpinning = false;
                    throw(this.MSG_COMPLETE_GENERATE_REPORT);
                }else if(status == "processing"){
                    console.log("processing");
                }else{
                    console.log("failed");
                    caller.showSpinning = false;
                    alert(this.MSG_ERROR_GENERATE_REPORT);
                    throw(this.MSG_ERROR_GENERATE_REPORT);
                }
            }), 
            err => {
                caller.showSpinning = false;
                alert(this.MSG_ERROR_GENERATE_REPORT);
                throw(this.MSG_ERROR_GENERATE_REPORT);
            }
    }

}
