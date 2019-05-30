import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { SectionHomeComponent } from './section/section-home/section-home.component';
import { SectionOneViewComponent } from './section/section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section/section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './section/section-three-view/section-three-view.component';

@NgModule({
  declarations: [SectionHomeComponent,SectionOneViewComponent,SectionTwoViewComponent,SectionThreeViewComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
