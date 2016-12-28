import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home.component';
import { BreadCrumbService } from './service/breadcrumb.service';
import { ReportExportService } from './service/report-export.service';
import { ReportTrackerService } from './service/report-tracker.service';
import { CassReportComponent } from './component/cass-report.component';
import { CarrierReportComponent } from './component/carrierpostage-report.component';
import { RunMonthComponent } from './component/runmonth.component';
import { DaterangeComponent } from './component/daterange.component';
import { SpinningComponent } from './component/spinning.component';
import { SpinningWaitComponent } from './component/spinning-wait.component';
import { ReportPanelComponent } from './component/report-panel.component'; 
import { CustomersComponent } from './component/customers.component';
import { FacilityComponent } from './component/facility.component';
import { BreadcrumbComponent } from './component/breadcrumb.component';
import { MenuService } from './service/menu.service';
import { CustomerService } from './service/customer.service';
import { FacilityService } from './service/facility.service';
import { SpinningWaitService } from './service/spinning-wait.service';
import { StringReplacementPipe } from './utils/string-replacement.pipe';
import { LevelIndentPipe } from './utils/level-indent.pipe';




@NgModule({
    imports: [ BrowserModule,
               FormsModule,
               HttpModule,
               routing],
    declarations: [AppComponent, 
                   HomeComponent,
                   CassReportComponent,
                   CarrierReportComponent, 
                   RunMonthComponent,
                   DaterangeComponent,
                   SpinningComponent,
                   SpinningWaitComponent,
                   ReportPanelComponent,
                   CustomersComponent,
                   FacilityComponent,
                   BreadcrumbComponent,
                   StringReplacementPipe,
                   LevelIndentPipe],
    bootstrap: [AppComponent],
    providers: [BreadCrumbService, MenuService, CustomerService, FacilityService, ReportExportService, ReportTrackerService, SpinningWaitService]
})
export class AppModule {}