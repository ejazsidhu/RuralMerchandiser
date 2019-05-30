import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'section-three-view',
  templateUrl: './section-three-view.component.html',
  styleUrls: ['./section-three-view.component.scss']
})
export class SectionThreeViewComponent implements OnInit {

  @Input('data') data;
  @Output('showModal') showModal:any=new EventEmitter<any>()
  constructor() { }

  ngOnInit() {
  }

}
