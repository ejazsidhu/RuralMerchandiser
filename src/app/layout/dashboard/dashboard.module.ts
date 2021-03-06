import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule, MatSelectModule, MatNativeDateModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { RawDataComponent } from './raw-data/raw-data.component';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './inner-pages/filter-bar/filter-bar.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';

import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';
import { MerchandiserListComponent } from './inner-pages/merchandiser-list/merchandiser-list.component';
import { MerchandiserProductivityComponent } from './inner-pages/merchandiser-productivity/merchandiser-productivity.component';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ShopDetailComponent } from './inner-pages/shop-detail/shop-detail.component';
import { ModalModule } from 'ngx-bootstrap';
import { UniqueBaseProductivityComponent } from './inner-pages/unique-base-productivity/unique-base-productivity.component';
import { SaleDataReportComponent } from './inner-pages/sale-data-report/sale-data-report.component';
import { StockPopLoadingComponent } from './inner-pages/stock-pop-loading/stock-pop-loading.component';
import { SaleDetailComponent } from './inner-pages/sale-detail/sale-detail.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { VoErrorReportComponent } from './inner-pages/vo-error-report/vo-error-report.component';
import { EvaluationSummaryComponent } from './inner-pages/evaluation-summary/evaluation-summary.component';
import { TimeAnalysisReportComponent } from './inner-pages/time-analysis-report/time-analysis-report.component';
import { TableauHelperComponent } from './tableau/tableau-helper/tableau-helper.component';
import { SaleAnalysisDashboardComponent } from './tableau/sale-analysis-dashboard/sale-analysis-dashboard.component';
import { SurveyDashboardComponent } from './tableau/survey-dashboard/survey-dashboard.component';
@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule.withConfig({addFlexToParent: false}),
        HttpClientModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatCardModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        Ng2OrderModule,
        AlertModule.forRoot(),
        ModalModule.forRoot()
    ],
    declarations: [FilterBarComponent, DashboardComponent, VisitProductivityComponent, 
        AttendanceReportComponent, MerchandiserListComponent, MerchandiserProductivityComponent, 
        ShopDetailComponent, RawDataComponent, UniqueBaseProductivityComponent, SaleDataReportComponent, 
        StockPopLoadingComponent, SaleDetailComponent, VoErrorReportComponent, EvaluationSummaryComponent, 
        TimeAnalysisReportComponent, TableauHelperComponent, SaleAnalysisDashboardComponent, SurveyDashboardComponent]
})
export class DashboardModule {}
