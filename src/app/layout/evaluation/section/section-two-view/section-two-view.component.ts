import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'section-two-view',
  templateUrl: './section-two-view.component.html',
  styleUrls: ['./section-two-view.component.scss']
})
export class SectionTwoViewComponent implements OnInit {
  @Input('data') data;
  @Output('showModal') showModal:any=new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

}
