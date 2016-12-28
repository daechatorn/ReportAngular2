import {Component, OnInit,Input} from '@angular/core';

import {BreadCrumb} from '../service/data-transfer-object';
import {BreadCrumbService} from '../service/breadcrumb.service';


@Component({
    selector: 'breadcrumb',
    template: `<ol class="breadcrumbOl">
                    <li><span><a href="javascript: goBackToCP('DefaultController');">Postal Home ></a></span></li>
                    <li *ngFor="let item of breadCrumbList; let i = index" >
                        <a *ngIf="!(breadCrumbList.length-1)==i"   
                         href="{{item.pageUrl}}">
                            {{item.pageNm}} >
                        </a>
                        <span *ngIf="(breadCrumbList.length-1)==i"> {{item.pageNm}} </span>
                    </li> 
                </ol>
               `
})

export class BreadcrumbComponent implements OnInit{
    breadCrumbList: BreadCrumb[];
    
    @Input() levelBreadCrumb: number;
    @Input() reportNm: string;

    ngOnInit(): void{
        let breadCrumninstance: BreadCrumbService = BreadCrumbService.getInstance();
        var pageUrl = window.location.pathname;
        var breadcrumb = {
                            level: this.levelBreadCrumb,
                            pageNm: this.reportNm,
                            pageUrl: pageUrl
                         }
        breadCrumninstance.getBreadCrumbs().then(breadCrumbs => this.breadCrumbList = breadCrumbs);          
        breadCrumninstance.regisBreadCrumb(breadcrumb);
        breadCrumninstance.getBreadCrumbs().then(breadCrumbs => this.breadCrumbList = breadCrumbs);  
    }

    

}

