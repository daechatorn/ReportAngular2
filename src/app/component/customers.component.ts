import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import {Customer} from '../service/data-transfer-object';
import {CustomerService} from '../service/customer.service';
import {SpinningWaitService} from '../service/spinning-wait.service';

@Component({
    selector: 'customers',
    template: `
                <select id="customerId" name="customerId" 
                        (change)="onSelectCustomer($event)" style="width:250px;">
                    <option value="1"> All Customers </option>
                    <option *ngFor="let customer of customers" [value]="customer?.customerId" >
                        <span [innerHTML]="customer?.customerName | level_indent: customer?.level"></span>
                    </option>
                </select>
              `
})

export class CustomersComponent implements OnInit {
    customerId: string;
    customers: Customer[];
    errorMessage:string;

    @Output()
    customerNotification = new EventEmitter();

    constructor(private customerService: CustomerService){}

    ngOnInit(): void{
        var spinning = SpinningWaitService.getInstance();
        spinning.isFinishLoad(false);
        this.customerId = 'ALL';
        this.customerService.getCustomers()
            .subscribe(
                        response=>this.customers=response,
                        error=>this.errorMessage=<any>error,
                        function() {
                            spinning.isFinishLoad(true);
                        }
                    );
    }

    onSelectCustomer(event):void {
        if (event.target.value == ""){
            this.customerId = 'ALL';
        }
        else {
            this.customerId = event.target.value;
        }   
        this.customerNotification.emit(this.customerId);
    }
}