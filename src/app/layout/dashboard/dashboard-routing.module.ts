import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';
import { SectionHomeComponent } from './inner-pages/section/section-home/section-home.component';
import { AttendanceReportComponent } from './inner-pages/attendance-report/attendance-report.component';

const routes: Routes = [
    {
        path: '',
        redirectTo:'visit_productivity'
        
    },
    { path: 'visit_productivity', component: VisitProductivityComponent },
    { path: 'evaluation', component: SectionHomeComponent },
    { path: 'attendance_report', component: AttendanceReportComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
