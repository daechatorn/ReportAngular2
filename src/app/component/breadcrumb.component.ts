import {Component, OnInit,Input} from '@angular/core';

import {BreadCrumb} from '../service/data-transfer-object';
import {BreadCrumbService} from '../service/breadcrumb.service';


@Component({
    selector: 'breadcrumb',
    template: `<ol class="breadcrumb"> 
                    <li *ngFor="let item of breadCrumbTracker; let i = index" >
                        <a *ngIf="!(breadCrumbTracker.length-1)==i"   
                         href="{{item.pageUrl}}">
                            {{item.pageNm}}
                        </a>
                        <span *ngIf="(breadCrumbTracker.length-1)==i"> {{item.pageNm}} </span>
                    </li> 
                </ol>
               `
})

export class BreadcrumbComponent implements OnInit{
    breadCrumbTracker: BreadCrumb[];

    @Input() levelBreadCrumb: number;
    @Input() reportNm: string;

    ngOnInit(): void{
        let breadCrumninstance: BreadCrumbService = BreadCrumbService.GetInstance();
        var pageUrl = window.location.pathname;
        var breadcrumb = {
                            level: this.levelBreadCrumb,
                            pageNm: this.reportNm,
                            pageUrl: pageUrl
                         }
        breadCrumninstance.getBreadCrumbs().then(breadCrumbs => this.breadCrumbTracker = breadCrumbs);          
        breadCrumninstance.regisBreadCrumb(breadcrumb);
        breadCrumninstance.getBreadCrumbs().then(breadCrumbs => this.breadCrumbTracker = breadCrumbs);  
    }

    

}

