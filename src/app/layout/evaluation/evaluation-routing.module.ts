import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionHomeComponent } from './section/section-home/section-home.component';

const routes: Routes = [ { path: '',redirectTo:'list' ,pathMatch:'full' },
{ path: 'list', component:SectionHomeComponent,
children:[
{ path: '', redirectTo:'home',pathMatch:'full'},
// { path: 'home',component:DetailsPageComponent },
// { path: 'details/:id',component:HomeComponent },

] },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
