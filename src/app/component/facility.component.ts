import {Component, OnInit, Input} from '@angular/core';
import {Facility, Customer} from '../service/data-transfer-object';
import {FacilityService} from '../service/facility.service';
import {SpinningWaitService} from '../service/spinning-wait.service';

@Component({
    selector: 'facility',
    template: `<select name="facility" style="HEIGHT: 22px; WIDTH: 200px" tabindex="2">
                    <option *ngFor="let facility of facilities" value="{{facility.facilityCd}}" >{{facility.facilityName}}</option>
               </select>`
})
export class FacilityComponent implements OnInit{
    facilities: Facility[];
    errorMessage:string;
    
    @Input() customerSeletected: Customer;

    constructor(private facilityService: FacilityService){}

    ngOnInit():void {
        this.getFacilities();
    }

    ngOnChanges():void {
        this.getFacilities();
    }

    getFacilities(): void{
        var spinning = SpinningWaitService.getInstance();
        spinning.isFinishLoad(false);
        this.facilityService
                .getFacilitiesByCustomerId(this.customerSeletected.customerId).subscribe(
                              response => this.facilities = response,
                              error => this.errorMessage=<any>error,
                              function() {
                                   spinning.isFinishLoad(true);
                              }
                            );
    }

    

}