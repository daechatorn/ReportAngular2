import {Component, OnInit} from '@angular/core';
import {Report} from '../service/data-transfer-object';
import {ReportService} from '../service/report.service';

@Component({
    selector: 'progressbar-report',
    template: `<div id="loadReportList" >
                <ul class="list-group">
                    <li id="{{report.reportId}}" *ngFor='let report of reportsList' 
                        class="list-group-item list-group-item-{{(report.status=='success')? 'success': 
                                    (report.status=='pending')? 'warning':'danger'}}" >
                        <button type="button" (click)="closeProgressBarReportByReportId(report.reportId)" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button> 
                        <span>
                            <a href="#">{{report.reportNm}}</a> is
                            <span>{{(report.status=='success')? 'downloaded successfully': 
                                    (report.status=='pending')? 'downloading Last checked':'downloaded unsuccessfully'}}</span>
                            at {{report.lastChecked}} PST Pacific Time
                        </span>
                    </li>
                </ul>
            </div>`
})

export class ProgressBarReportComponent implements OnInit{
    showProgressBar: boolean;
    reportsList: Report[];

    constructor(private reportService: ReportService){
       this.showProgressBar = true;
    }

    ngOnInit(): void{
        this.reportService.getReports().then(reports => this.reportsList = reports);
    }
   
    closeProgressBarReportByReportId(reportId): void{
       this.showProgressBar = false;
    }
}
