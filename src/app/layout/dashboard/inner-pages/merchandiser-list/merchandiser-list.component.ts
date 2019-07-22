import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss']
})
export class MerchandiserListComponent implements OnInit {

  title="merchandiser List"
  minDate = new Date(2000, 0, 1);
  maxDate:any = new Date();
  startDate:any=new Date();
  endDate=new Date();
  loadingReportMessage=false;
    merchandiserList: any=[];
  loading: boolean;
    constructor(private httpService:DashboardService) { 
  
    this.maxDate.setDate(this.maxDate.getDate()-1);
    this.startDate.setDate(this.startDate.getDate()-1)
  
    this.startDate = moment(this.startDate).format('YYYY-MM-DD');

  
    }
  
    ngOnInit() {
      this.getMerchandiserList(this.startDate);
    }
  
    getMerchandiserList(date) {
      date = moment(date).format('YYYY-MM-DD');
      let obj = {
        evaluatorId: localStorage.getItem('user_id'),
        startDate: date
      };
  
      this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data: any) => {
        // console.log('merchandiser list for evaluation',data);
        if (data) {
          this.merchandiserList = data;
          this.loading = false;
        }
      });
    }
  
    modifyDate(date){
      return moment(date).format('YYYY-MM-DD');
    }
  

}
