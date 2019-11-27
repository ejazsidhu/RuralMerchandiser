import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';

import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';
import { MerchandiserListComponent } from './inner-pages/merchandiser-list/merchandiser-list.component';
import { MerchandiserProductivityComponent } from './inner-pages/merchandiser-productivity/merchandiser-productivity.component';
import { ShopDetailComponent } from './inner-pages/shop-detail/shop-detail.component';
import { RawDataComponent } from './raw-data/raw-data.component';
import { UniqueBaseProductivityComponent } from './inner-pages/unique-base-productivity/unique-base-productivity.component';
import { SaleDataReportComponent } from './inner-pages/sale-data-report/sale-data-report.component';
import { StockPopLoadingComponent } from './inner-pages/stock-pop-loading/stock-pop-loading.component';
import { SaleDetailComponent } from './inner-pages/sale-detail/sale-detail.component';
import { VoErrorReportComponent } from './inner-pages/vo-error-report/vo-error-report.component';
import { EvaluationSummaryComponent } from './inner-pages/evaluation-summary/evaluation-summary.component';
import { TimeAnalysisReportComponent } from './inner-pages/time-analysis-report/time-analysis-report.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'visit_productivity'

    },
    { path: 'visit_productivity', component: VisitProductivityComponent },
    { path: 'attendance_report', component: AttendanceReportComponent },
    { path: 'unique-base-productivity', component: UniqueBaseProductivityComponent },
    { path: 'merchandiser_List', component: MerchandiserListComponent },
    { path: 'evaluation_summary', component: EvaluationSummaryComponent },
    { path: 'time_analysis', component: TimeAnalysisReportComponent },
    { path: 'productivity_report', component: MerchandiserProductivityComponent },
    { path: 'sale-data-report', component: SaleDataReportComponent },
    { path: 'stock-pop-loading', component: StockPopLoadingComponent },

    { path: 'raw_data', component: RawDataComponent },
    { path: 'evaluation', loadChildren: '../evaluation/evaluation.module#EvaluationModule' },
    { path: 'shop_detail/:id', component: ShopDetailComponent },
    { path: 'sale_detail', component: SaleDetailComponent },
    { path: 'vo_error_report', component: VoErrorReportComponent },




];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
