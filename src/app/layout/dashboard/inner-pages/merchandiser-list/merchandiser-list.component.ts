import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-merchandiser-list',
  templateUrl: './merchandiser-list.component.html',
  styleUrls: ['./merchandiser-list.component.scss']
})
export class MerchandiserListComponent implements OnInit {

  title = 'merchandiser List';
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  endDate = new Date();
  loadingReportMessage = false;
  merchandiserList: any = [];
  loading: boolean;
  selectedRTE: any = {};
  tempMerchandiserList: any = [];
  rteList: any = [];

  constructor(private httpService: DashboardService) {

    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.startDate.setDate(this.startDate.getDate() - 1);

    // this.startDate = moment(this.startDate).format('YYYY-MM-DD');


  }

  ngOnInit() {
    this.getMerchandiserList(this.startDate);

  }

  getMerchandiserList(date) {
    this.tempMerchandiserList = [];
    this.rteList = [];
    date = moment(date).format('YYYY-MM-DD');
    const obj = {
      evaluatorId: localStorage.getItem('user_id'),
      startDate: date
    };

    this.httpService.getMerchandiserListForEvaluation(obj).subscribe((data: any) => {
      // console.log('merchandiser list for evaluation',data);
      if (data) {
        this.tempMerchandiserList = data;
        this.merchandiserList = data;
        this.loading = false;
        this.getRTEList();
      }
    });
  }

  modifyDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  getRTEList() {
    const map = new Map();
    for (const item of this.tempMerchandiserList) {
      if (!map.has(item.rte_id)) {
        map.set(item.rte_id, true);    // set any value to Map
        this.rteList.push(item);
      }
    }
    this.rteList.sort((a, b) => (a.rte_name > b.rte_name) ? 1 : -1);
  }

  loadMerchandiserRTEWise() {
    console.log(this.selectedRTE);
    this.merchandiserList = [];
    for (const item of this.tempMerchandiserList) {
      if (this.selectedRTE.rte_id === item.rte_id) {
        this.merchandiserList.push(item);
      }
    }
    // this.rteList.sort((a, b) => (a.rte_name > b.rte_name) ? 1 : -1);
  }



}
