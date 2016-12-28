import {Injectable} from '@angular/core';
import {Facility} from './data-transfer-object'

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {getCookie, getAppCfg} from '../utils/utility-functions';

@Injectable()
export class FacilityService {

    constructor(private http:Http){}
    private dataUrl = getAppCfg().POSTAL_REPORT_URL+ "prservice/facilities";

    getFacilitiesByCustomerId(customerId: string): Observable<Facility[]> {
        let token = getCookie("web_session_id");
        let headers = new Headers({'web_session_id': token});
        headers.append('customerId',customerId);
        var options = {
            headers: headers
        };
        return this.http.get(this.dataUrl, options)
                       .map((res:Response) => res.json())
                       .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}