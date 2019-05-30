import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { VisitProductivityComponent } from './inner-pages/visit-productivity/visit-productivity.component';
import { SectionHomeComponent } from './inner-pages/section/section-home/section-home.component';

const routes: Routes = [
    {
        path: '',
        redirectTo:'visit_productivity'
        
    },
    { path: 'visit_productivity', component: VisitProductivityComponent },
    { path: 'evaluation', component: SectionHomeComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
