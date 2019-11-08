import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit {
  title="sale detail"

  constructor() { }

  ngOnInit() {
    let obj=JSON.parse(localStorage.getItem("sale_detail_obj"));
    if(obj.dataType=='SALE_DATA')
    this.title= 'SALE DATA';
    else if(obj.dataType=='ORDER_DATA')
    this.title= 'ORDER DATA';
    
  }

}
