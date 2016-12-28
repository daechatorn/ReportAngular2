import {Component, OnInit} from '@angular/core';
import {Menu} from '../service/data-transfer-object';
import {MenuService} from '../service/menu.service';
import {SpinningWaitService} from '../service/spinning-wait.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
})

export class HomeComponent implements OnInit {
    reportNm: string = "Postal Reports";
    menus: Menu[];
    errorMessage:string;
    constructor(private menuService: MenuService){}

    ngOnInit():void {
        var spinning = SpinningWaitService.getInstance();
        spinning.isFinishLoad(false);
        this.menuService.getMenus().
                        subscribe(
                            response => this.menus = response,
                            error => this.errorMessage=<any>error,
                            function() { 
                                spinning.isFinishLoad(true);
                            }
                        );
    }

}