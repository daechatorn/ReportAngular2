import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home.component';
import { BreadCrumbService } from './service/breadcrumb.service';
import { CassReportService } from './service/cass-report.service';
import { ReportTrackerService } from './service/report-tracker.service';
import { CassReportComponent } from './component/cass-report.component';
import { RunMonthComponent } from './component/runmonth.component';
import { DaterangeComponent } from './component/daterange.component';
import { SpinningComponent } from './component/spinning.component';
import { ReportPanelComponent } from './component/report-panel.component'; 
import { CustomersComponent } from './component/customers.component';
import { BreadcrumbComponent } from './component/breadcrumb.component';
import { MenuService } from './service/menu.service';
import { CustomerService } from './service/customer.service';
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
                   RunMonthComponent,
                   DaterangeComponent,
                   SpinningComponent,
                   ReportPanelComponent,
                   CustomersComponent,
                   BreadcrumbComponent,
                   StringReplacementPipe,
                   LevelIndentPipe],
    bootstrap: [AppComponent],
    providers: [BreadCrumbService, MenuService, CustomerService, CassReportService, ReportTrackerService]
})
export class AppModule {}