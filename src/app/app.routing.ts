import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home.component';
import { CassReportComponent } from './component/cass-report.component';
import { CarrierReportComponent } from './component/carrierpostage-report.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cass-mail-report',
        component: CassReportComponent
    },
    {
        path: 'carrier-postage-report',
        component: CarrierReportComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);