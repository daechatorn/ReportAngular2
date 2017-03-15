import {Component, OnInit} from '@angular/core';
import {Report} from '../service/data-transfer-object';
import {ReportTrackerService} from '../service/report-tracker.service';
import {ReportExportService} from '../service/report-export.service';

@Component({
    selector: 'report-panel',
    template: `<div class="showReportPanelLink" *ngIf="reportsPanelList?.length > 0">
                <a (click)="showReportPanelAction()" href="javascript:void(0);" >
                    Report history <span>({{reportsPanelList.length}})</span>
                </a>
                
                <div id="loadReportList" class="scrollbar" *ngIf="showReportPanel" >
                    <div  id="callout-navs-tabs-plugin" *ngFor="let report of reportsPanelList" 
                        [className]=rowPanelCSSClass+report.status> 
                        
                        <span *ngIf="report.status!='complete'" [className]=report.status >{{report.criteriaRpt.reportNm}}_{{report.generateOn}}</span> 
                        <a *ngIf="report.status=='complete'" href="#" >{{report.criteriaRpt.reportNm}}_{{report.generateOn}}</a>
                        
                        <span> is 
                            {{(report.status=='complete')? 'downloaded successfully': 
                            (report.status=='processing') || (report.status=='pending') ? 'downloading':
                            (report.status=='paused') ? 'pausing': 'downloaded unsuccessfully'}}.
                            Last checked at {{report.lastChecked}}
                        </span>
                    </div>
                </div>
               </div>`
})

export class ReportPanelComponent implements OnInit{

    reportsPanelList: Report[];
    rowPanelCSSClass: string = "rowReportPanel ";
    showReportPanel: boolean = true;
    constructor(private reportTrackerService: ReportTrackerService,
                private reportExportService: ReportExportService){
    }
    
    ngOnInit(): void{
        this.reportTrackerService.getReports()
            .then(
                reports => (
                    this.reportsPanelList = reports
                )
            );
    }
    
    showReportPanelAction(): void{
        this.showReportPanel = !this.showReportPanel;
    }
    

}