import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {getCookie, getAppCfg} from '../utils/utility-functions';

import {Observable} from 'rxjs/Rx';
import {CriteriaRpt} from './data-transfer-object';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()   
export class CassReportService {
    
    constructor (private http: Http) {}
    private url = getAppCfg().POSTAL_REPORT_URL + "prservice/reports";

    sendCriteria(criteria: CriteriaRpt) {
        let body = JSON.stringify(criteria);
        let token = getCookie("web_session_id");
        let headers = new Headers({ 'Content-Type': 'application/json',
                                    'web_session_id': token});
        var options = new RequestOptions({
            headers: headers
        });
        console.log("send excel:" + body);
        console.log("host:" + window.location.hostname);
        this.http.post(this.url, body, options)
                 .map((res:Response) => res.json)
                 .subscribe( data => { console.log(data)});
    }
}
