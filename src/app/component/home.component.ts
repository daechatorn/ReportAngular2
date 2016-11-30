import {Component, OnInit} from '@angular/core';
import {Menu} from '../service/data-transfer-object';
import {MenuService} from '../service/menu.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    reportNm: string = "Postal Reports";
    menus: Menu[];
    errorMessage:string;
    
    constructor(private menuService: MenuService){}

    ngOnInit():void {
        this.menuService
                .getMenus().subscribe(
                              response => this.menus = response,
                              error => this.errorMessage=<any>error
                            );
    }

}