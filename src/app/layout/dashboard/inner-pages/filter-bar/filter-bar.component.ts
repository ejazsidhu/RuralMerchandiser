import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment'
@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
//#region veriables
minDate = new Date(2000, 0, 1);
maxDate = new Date(2020, 0, 1);
@Input() title;
loadingData: boolean;
regions: any = [];

selectedRegion: any = {};

startDate = new Date();
endDate = new Date();

loadingReportMessage: boolean = false;
tabsData: any = [];
loading = true;

//#endregion

  constructor(private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router) { }

  ngOnInit() {
    this.loading=true;
    this.getRegions()
  }

  downloadReport() {
    if (this.endDate >= this.startDate) {

      let obj={
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      }

      let url='';
      let encodeURL:any= this.httpService.UrlEncodeMaker(obj);

    }
    else{
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }
  
  }

  getRegions(){
    this.httpService.getRegion().subscribe(data=>{
      if(data)
      this.regions=data;
      this.loading=false
    })
  }


}
