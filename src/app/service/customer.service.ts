import {Injectable} from '@angular/core';
import {Customer} from './data-transfer-object';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {getCookie, getAppCfg} from '../utils/utility-functions';


@Injectable()
export class CustomerService {

    constructor(private http:Http){}
    private dataUrl = getAppCfg().POSTAL_REPORT_URL+ "prservice/customers";
    customers: Customer[];
    getCustomers(): Observable<Customer[]>{

        let token = getCookie("web_session_id");
        let headers = new Headers({'web_session_id': token});
        var options = {
            headers: headers
        };
        return this.http.get(this.dataUrl, options)
                       .map((res:Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
    
    }
    
}