import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'section-one-view',
  templateUrl: './section-one-view.component.html',
  styleUrls: ['./section-one-view.component.scss']
})
export class SectionOneViewComponent implements OnInit {
  @Input('data') data;
  @Output('showModal') showModal:any=new EventEmitter<any>()

  selectedImage: any={};
  selectedShop: any;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    this.data=changes.data.currentValue;
    this.selectedImage=this.data.imageList[0];
    
  }
  ngOnInit() {
  }
  showChildModal(shop): void {
    this.selectedShop=shop;
    this.showModal.emit(this.selectedImage)

    // this.childModal.show();
  }
  setSelectedImage(img){
    this.selectedImage=img;

  }
}
