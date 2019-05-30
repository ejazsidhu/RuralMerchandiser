import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { SectionHomeComponent } from './section/section-home/section-home.component';
import { SectionOneViewComponent } from './section/section-one-view/section-one-view.component';
import { SectionTwoViewComponent } from './section/section-two-view/section-two-view.component';
import { SectionThreeViewComponent } from './section/section-three-view/section-three-view.component';
import { SectionLandingPageComponent } from './section/section-landing-page/section-landing-page.component';

@NgModule({
  declarations: [SectionHomeComponent,SectionOneViewComponent,SectionTwoViewComponent,SectionThreeViewComponent, SectionLandingPageComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule
  ]
})
export class EvaluationModule { }
