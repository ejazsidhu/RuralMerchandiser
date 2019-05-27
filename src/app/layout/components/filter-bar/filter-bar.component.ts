import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
//#region veriables
minDate = new Date(2000, 0, 1);
maxDate = new Date(2020, 0, 1);
@Input() title;
zones: any = [];
loadingData: boolean;
regions: any = [];
channels: any = [];

selectedZone: any = {};
selectedRegion: any = {};
selectedChannel: any = [];
startDate = new Date();
endDate = new Date();
areas: any = [];
selectedArea: any = {};
lastVisit: any = [];
selectedLastVisit = 1;
mustHave: any = [];
mustHaveAll: any = [];
selectedMustHave = false;
selectedMustHaveAll = '';
merchandiserList: any = [];
selectedMerchandiser: any = {};
clickedOnce = 1;
categoryList: any = [];
selectedCategory: any = {};
cities: any = [];
selectedCity: any = {};
productsList: any = [];
selectedProduct: any = [];
selectedImpactType: any = {};
impactTypeList: any = [];

queryList: any=[];
selectedQuery:any={};

loadingReportMessage: boolean = false;
tabsData: any = [];
loading = true;
sortOrder=true;
sortBy:'completed'
//#endregion

  constructor(private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router) { }

  ngOnInit() {
  }

}
