import {Injectable} from '@angular/core';

import {BreadCrumb} from './data-transfer-object';

@Injectable()
export class BreadCrumbService {
    private static _instance: BreadCrumbService = new BreadCrumbService();
    breadCrumbList: BreadCrumb[];
    sessionStorageNm: string = "breadCrumbPath";

    constructor() {
        if(BreadCrumbService._instance !== undefined) {
            throw new TypeError("This class is defined as a Singleton, please use getInstance instead of constructing a new object.");
        }

        BreadCrumbService._instance = this;
        this.breadCrumbList = [];
    }

    public static getInstance(): BreadCrumbService {
        return BreadCrumbService._instance;
    } 

    getBreadCrumbs(): Promise<BreadCrumb[]> {
         var breadCrumbs = JSON.parse(window.sessionStorage.getItem(this.sessionStorageNm));
         if(breadCrumbs != null){
            this.breadCrumbList =  breadCrumbs;
         }else{
             this.breadCrumbList = [];
         }
         return Promise.resolve(this.breadCrumbList);
    }
    
    regisBreadCrumb(breadCrumb: BreadCrumb): void{
        if(breadCrumb != null){
            if(breadCrumb.level == 0){
                this.breadCrumbList = [];
            }
            if(this.isExistsInBreadCrumb(breadCrumb)){
                this.breadCrumbList.push(breadCrumb);
            }
            window.sessionStorage.setItem(this.sessionStorageNm, JSON.stringify(this.breadCrumbList));
        }else{
            console.log("Please check your breadCrumb ::: breadCrumb is null");
        }
    }

    isExistsInBreadCrumb(breadCrumb): boolean{
        for(var k in this.breadCrumbList) {
            var breadCrumbObj = this.breadCrumbList[k];
            if(breadCrumbObj.level == breadCrumb.level){
                this.breadCrumbList[k] = breadCrumb;
                return false;
            }
        }
        return true;
    }

}
