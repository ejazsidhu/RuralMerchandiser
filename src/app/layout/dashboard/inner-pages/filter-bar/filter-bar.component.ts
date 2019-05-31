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
this.loadingReportMessage=true;
      let obj={
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      }

      let url='visitProductivityReport';
      let body= this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url,body).subscribe(data=>{
        let res: any = data

        if(res){
          let obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          }
          let url = 'downloadReport'
          this.getproductivityDownload(obj2, url)
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry','Connectivity Message')
        }
      })

    }
    else{
      this.toastr.info('End date must be greater than start date', 'Date Selection')

    }
  
  }

  getRegions(){
    this.httpService.getRegionFixed().subscribe(data=>{
      if(data){
        this.regions=data;
        this.loading=false;
        this.selectedRegion=data[0]
      }
     
    })
  }
  getproductivityDownload(obj, url) {
    const u = url
    this.httpService.DownloadResource(obj, u);
  setTimeout(() => {
    this.loadingData = false;
    this.loadingReportMessage = false;
  }, 1000);

  }

}
