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

import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './inner-pages/filter-bar/filter-bar.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';
import { SectionOneViewComponent } from './inner-pages/section/section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './inner-pages/section/section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './inner-pages/section/section-three-view/section-three-view.component';
import { SectionHomeComponent } from './inner-pages/section/section-home/section-home.component';
import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';
import { MerchandiserListComponent } from './inner-pages/merchandiser-list/merchandiser-list.component';

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
        MatInputModule
    ],
    declarations: [FilterBarComponent,DashboardComponent, VisitProductivityComponent, SectionOneViewComponent, SectionTwoViewComponent, SectionThreeViewComponent, SectionHomeComponent, AttendanceReportComponent, MerchandiserListComponent]
})
export class DashboardModule {}
