import { Component, OnInit, Input, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit, AfterContentInit {
  //#region veriables
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  @Input() title;
  loadingData: boolean;
  regions: any = [];
  tableData: any = [];
  queryList: any = [];
  selectedQuery: any = {};
  selectedBrand: any = {};
  selectedRegion: any = {};
  merchandiser: any = {};
  sortOrder = true;
  sortBy: 'completed';
  startDate = new Date();
  endDate = new Date();

  loadingReportMessage = false;
  tabsData: any = [];
  loading = true;
  RTEList: any = [];
  selectedRTE: any = {};
  merchandiserRTEList: any = [];
  selectedMerchandiserRTE: any = {};
  selectedDataType: any;
  categoryList: any = [];
  selectedCategory: any = {};
  brandList: any = [];
  totalVisits: any;
  totalQuantity: any;
  totalAmount: any;

  //#endregion

  constructor(private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router, private activeRoute: ActivatedRoute) {


  }


  ngAfterContentInit() {
    const obj: any = JSON.parse(localStorage.getItem('sale_detail_obj'));
    // this.selectedDataType = obj.dataType

    if (obj && this.router.url === '/dashboard/sale_detail') {
      if (Object.keys(obj.regionId).length !== 0 && obj.regionId.constructor === Object) {
        this.selectedRegion = obj.regionId.id; // { zone_id: 0, id: 6, title: "Multan", type: 3 };
        console.log('object region', this.selectedRegion);
        this.selectedDataType = obj.dataType;

        setTimeout(() => {
          this.regionChange();
        }, 200);

      }
      if (Object.keys(obj.rteId).length !== 0 && obj.rteId.constructor === Object) {
        this.selectedRTE = obj.rteId.id;
        console.log('object selectedRTE', this.selectedRTE);

        setTimeout(() => {
          this.regionRTE();
        }, 200);

      }

      if (Object.keys(obj.merchandiserId).length !== 0 && obj.merchandiserId.constructor === Object) {
        this.selectedMerchandiserRTE = obj.merchandiserId.id;
        console.log('object selectedMerchandiserRTE', this.selectedMerchandiserRTE);

        setTimeout(() => {
          this.statsMerchandiserWise();

        }, 200);

      }

      this.startDate = obj.startDate;
      this.endDate = obj.endDate;
      // this.getTabsDataForSaleDetail()
    }
  }


  getCategoryList() {
    this.httpService.getcategories().subscribe((data: any) => {
      // console.log("category list",data)
      console.log(data);

      this.categoryList = data.categoryList;
      this.brandList = data.brandList;
      console.log(this.categoryList);
      console.log(this.brandList);

    }, error => { });
  }
  ngOnInit() {
    this.loading = true;

    console.log(this.router.url);
    if (this.router.url === '/dashboard/visit_productivity') {
      this.getTabsData();
    }
    if (this.router.url === '/dashboard/raw_data') {
      this.getQueryTypeList();
    }

    if (this.router.url !== '/dashboard/sale_detail') {
      localStorage.removeItem('sale_detail_obj');
    }
    if (this.router.url === '/dashboard/sale_detail') {
      this.getCategoryList();
      this.getTabsDataForSaleDetail();
      const obj: any = JSON.parse(localStorage.getItem('sale_detail_obj'));

      this.selectedDataType = obj.dataType;
    }


    this.getRegions();


  }

  categoryChangeSaleDetail() {
    this.getTabsDataForSaleDetail();


  }

  brandChangeSaleDetail() {
    this.getTabsDataForSaleDetail();

  }
  getRTE(regionId) {
    this.httpService.getRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.RTEList = data;
        setTimeout(() => {
          this.loading = false;
          this.loadingData = false;
        }, 1000);
      }

      if (this.router.url === '/dashboard/sale_detail') {
        this.getTabsDataForSaleDetail();
      } else {
        this.getTabsData();
      }
    });
  }
  onRegionChange() {
    this.loading = true;
    this.loadingData = true;
    this.RTEList = [];
    this.selectedRTE = {};
    this.merchandiserRTEList = [];
    this.selectedMerchandiserRTE = {};

    this.getRTERegionWise(this.selectedRegion.id);


  }

  goToSaleDetail(dataType: string) {
    const sale_details_obj: any = {
      rteId: this.selectedRTE,
      regionId: this.selectedRegion,
      merchandiserId: this.selectedMerchandiserRTE,
      startDate: this.startDate,
      endDate: this.endDate,
      dataType: dataType
    };
    localStorage.setItem('sale_detail_obj', JSON.stringify(sale_details_obj));

    this.router.navigate(['/dashboard/sale_detail']);

    // this.router.navigate(['/dashboard/sale_detail'], { queryParams: { rteId: this.selectedRTE.id,merchandiserId:this.selectedMerchandiserRTE.id,regionId:this.selectedRegion.id,startDate:moment(this.startDate).format("YYYY-MM-DD"),endDate:moment(this.endDate).format("YYYY-MM-DD")}, queryParamsHandling: 'merge' });
  }
  getRTERegionWise(regionId) {
    this.httpService.getRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.RTEList = data;
        setTimeout(() => {
          this.loading = false;
          this.loadingData = false;
        }, 1000);
      }
    });
  }
  getMerchandiserListRTE(regionId) {
    this.httpService.getMerchandiserListRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.merchandiserRTEList = data;
        setTimeout(() => {
          this.loading = false;
          this.loadingData = false;
        }, 1000);
      }
      if (this.router.url === '/dashboard/sale_detail') {
        this.getTabsDataForSaleDetail();
      } else {
        this.getTabsData();
      }
    });
  }

  getMerchandiserListRTEWise(regionId) {
    this.httpService.getMerchandiserListRTE(regionId).subscribe((data: any) => {
      if (data) {
        this.merchandiserRTEList = data;
        setTimeout(() => {
          this.loading = false;
          this.loadingData = false;
        }, 1000);
      }

    });
  }
  regionChange() {
    this.loading = true;
    this.loadingData = true;
    this.RTEList = [];
    (this.selectedRTE) ? (this.selectedRTE = this.selectedRTE) : (this.selectedRTE = {});
    this.merchandiserRTEList = [];
    (this.selectedMerchandiserRTE) ? (this.selectedMerchandiserRTE = this.selectedMerchandiserRTE) : (this.selectedMerchandiserRTE = {});
    // this.selectedMerchandiserRTE = {};

    this.selectedRegion.id ? this.getRTE(this.selectedRegion.id) : this.getRTE(this.selectedRegion);


  }

  regionChangeSaleDetail() {
    this.loading = true;
    this.loadingData = true;
    this.RTEList = [];
    this.selectedRTE = {};
    this.merchandiserRTEList = [];
    this.selectedMerchandiserRTE = {};
    this.getRTE(this.selectedRegion);

  }


  regionRTE() {
    this.merchandiserRTEList = [];
    (this.selectedMerchandiserRTE) ? (this.selectedMerchandiserRTE = this.selectedMerchandiserRTE) : (this.selectedMerchandiserRTE = {});
    this.loading = true;
    this.loadingData = true;
    (this.selectedRTE.id) ? this.getMerchandiserListRTE(this.selectedRTE.id) : this.getMerchandiserListRTE(this.selectedRTE);

    // this.getMerchandiserListRTE(this.selectedRTE.id);

  }

  onRTEChange() {
    this.merchandiserRTEList = [];
    this.selectedMerchandiserRTE = {};
    this.loading = true;
    this.loadingData = true;
    (this.selectedRTE.id) ? this.getMerchandiserListRTEWise(this.selectedRTE.id) : this.getMerchandiserListRTEWise(this.selectedRTE);

  }
  statsMerchandiserWise() {
    this.loading = true;
    if (this.router.url === '/dashboard/sale_detail') {
      this.getTabsDataForSaleDetail();
    } else {
      this.getTabsData();
    }
  }
  getQueryTypeList() {

    this.httpService.getQueryTypeList().subscribe(data => {
      console.log('qurry list', data);
      if (data) {
        this.queryList = data;
      }

    }, error => {
      (error.status === 0) ?
        this.toastr.error('Please check Internet Connection', 'Error') :
        this.toastr.error(error.description, 'Error');


    });

  }
  downloadVOErrorReport() {
    if (this.endDate >= this.startDate) {
      if(this.selectedRegion.id == undefined){
        this.toastr.info('Please, select region', 'Info');
        return;
      }
      this.loadingReportMessage = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        pageType: 0
      };

      const url = 'dailyEvaluationReport';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }
  }

  downloadEvaluationSummaryReport() {
    if (this.endDate >= this.startDate) {
      if(this.selectedRegion.id == undefined){
        this.toastr.info('Please, select region', 'Info');
        return;
      }
      this.loadingReportMessage = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        pageType: 1
      };

      const url = 'dailyEvaluationReport';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }
  }

  downloadReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        rteId: this.selectedRTE.id || -1,
        merchandiserId: this.selectedMerchandiserRTE.id || -1,
      };

      const url = 'visitProductivityReport';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }

  }


  downloadUniqueBaseProductivityReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      };

      const url = 'capturedAbnormalUnvisited';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }

  }

  downloadRawDataReport() {
    this.loadingData = true;
    const obj = {
      queryId: this.selectedQuery.id,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };
    const url = "dashboard-data";
    const body = this.httpService.UrlEncodeMaker(obj);
    this.httpService.getKeyForProductivityReport(body, url).subscribe(
      (data) => {
        const res: any = data;
        if (res) {

          const obj2 = {
            key: res.key,
            fileType: res.fileType,
          };
          const url =
            this.selectedQuery.type == 1
              ? "downloadcsvReport"
              : "downloadReport";

          this.getproductivityDownload(obj2, url);
        } else {
          this.loadingData = false;
          this.loadingReportMessage = false;
          this.toastr.info(
            "Something went wrong, please retry",
            "Connectivity Message"
          );
        }
      },
      (error) => {
        this.loadingData = false;
        this.loadingReportMessage = false;
        this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
      }
    );
  }
  downloadAttandanceReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      };

      const url = 'merchandiserAttendance';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }

  }

  downloadSaleDataReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        rteId: this.selectedRTE.id || -1,
        merchandiserId: this.selectedMerchandiserRTE.id || -1
      };

      const url = 'saleDataReport';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }

  }

  downloadStockPopLoadingReport() {
    if (this.endDate >= this.startDate) {
      this.loadingReportMessage = true;
      this.loadingData = true;
      const obj = {
        regionId: this.selectedRegion.id || -1,
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
      };

      const url = 'stockReport';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForReport(url, body).subscribe(data => {
        const res: any = data;

        if (res) {
          const obj2 = {
            key: res.key,
            fileType: 'json.fileType'
          };
          const url = 'downloadReport';
          this.getproductivityDownload(obj2, url);
        } else {
          // this.clearLoading()

          this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
        }
      });

    } else {
      this.toastr.info('End date must be greater than start date', 'Date Selection');

    }

  }

  getRegions() {
    this.loading = true;
    this.httpService.getRegionFixed().subscribe(data => {
      if (data) {
        this.regions = data;

        // this.selectedRegion=data[0]
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }

    });
  }
  getproductivityDownload(obj, url) {
    const u = url;
    this.httpService.DownloadResource(obj, u);
    this.loadingData = false;
    this.loadingReportMessage = false;
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
    }, 1000);

  }

  getAttendanceDownload(obj, url) {
    const u = url;
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
    }, 1000);

  }

  getTabsData(data?: any, dateType?: string) {

    this.loading = true;
    // debugger;
    const obj: any = {
      // zoneId: (this.selectedZone.id) ? this.selectedZone.id : -1,
      // regionId take from local storage to show only regional data, that region id taged to specific login
      regionId: (this.selectedRegion.id) ? this.selectedRegion.id : localStorage.getItem('regionId'),
      startDate: (dateType === 'start') ? moment(data).format('YYYY-MM-DD') : moment(this.startDate).format('YYYY-MM-DD'),
      endDate: (dateType === 'end') ? moment(data).format('YYYY-MM-DD') : moment(this.endDate).format('YYYY-MM-DD'),
      rteId: this.selectedRTE.id || -1,
      merchandiserId: this.selectedMerchandiserRTE.id || -1

    };
    localStorage.setItem('obj', JSON.stringify(obj));
    this.getTableData(obj);


    this.httpService.getDashboardData(obj).subscribe(data => {
      // console.log(data, 'home data');
      const res: any = data;
      if (res) {
        this.tabsData = data;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {


    });


  }



  getTabsDataForSaleDetail() {

    const obj1: any = JSON.parse(localStorage.getItem('sale_detail_obj'));

    this.loading = true;
    // debugger;
    const obj: any = {
      // zoneId: (this.selectedZone.id) ? this.selectedZone.id : -1,
      regionId: (this.selectedRegion.id) ? this.selectedRegion.id : (this.selectedRegion || -1),
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      rteId: this.selectedRTE.id ? this.selectedRTE.id : (this.selectedRTE || -1),
      merchandiserId: (this.selectedMerchandiserRTE.id) ? this.selectedMerchandiserRTE.id : (this.selectedMerchandiserRTE || -1),
      dataType: (this.selectedDataType || obj1.dataType),
      tposmCategoryId: this.selectedCategory.id || -1,
      brandType: this.selectedBrand.brand || 'All'
    };
    localStorage.setItem('obj', JSON.stringify(obj));

    this.getTableForSaleData(obj);


    // this.httpService.getDashboardData(obj).subscribe(data => {
    //   // console.log(data, 'home data');
    //   const res: any = data;
    //   if (res) {
    //     this.tabsData = data;
    //   }
    //   this.loading = false;
    //   // if (res.planned == 0)
    //   //   this.toastr.info('No data available for current selection', 'Summary')
    // }, error => {


    // });


  }
  getTableData(obj) {

    this.httpService.merchandiserShopListCBL(obj).subscribe(data => {
      console.log(data, 'table data');
      const res: any = data;

      if (res) {
        this.tableData = res;
      }
      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      // this.clearLoading();

      console.log(error, 'home error');

    });
  }

  getCalculation(data) {
    this.totalVisits = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    data.forEach(element => {
      if (element.sale_visit) {
      this.totalVisits += element.sale_visit;
      }

      if (element.sale_qty) {
      this.totalQuantity += element.sale_qty;
      }
      if (element.sale_amount) {
      this.totalAmount += element.sale_amount;
      }


    });
  }

  getTableForSaleData(obj) {

    this.httpService.saleDetailData(obj).subscribe(data => {
      console.log(data, 'table data');
      const res: any = data;

      if (res) {
        this.tableData = res;
        this.getCalculation(this.tableData);
      }

      this.loading = false;
      // if (res.planned == 0)
      //   this.toastr.info('No data available for current selection', 'Summary')
    }, error => {
      // this.clearLoading();

      console.log(error, 'home error');

    });
  }

  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }
  getArrowType(key) {
    if (key === this.sortBy) {
      return (this.sortOrder) ? 'arrow_upward' : 'arrow_downward';
    } else {
      return '';
    }
  }

  timeAnalysisReport() {
    if (this.endDate >= this.startDate) {
      this.loadingData = true;
      this.loadingReportMessage = true;
      const obj = {
        startDate: moment(this.startDate).format('YYYY-MM-DD'),
        endDate: moment(this.endDate).format('YYYY-MM-DD'),
        regionId: this.selectedRegion.id || -1,
        actionType: this.selectedRegion.id === -1 ? 0 : 1,
        // channelId: this.arrayMaker(this.selectedChannel),
      };

      const url = 'time-analysis';
      const body = this.httpService.UrlEncodeMaker(obj);
      this.httpService.getKeyForProductivityReport(body, url).subscribe(
        data => {
          console.log(data, 'oos shoplist');
          const res: any = data;

          if (res) {
            const obj2 = {
              key: res.key,
              fileType: 'json.fileType'
            };
            const url = 'downloadReport';
            this.getproductivityDownload(obj2, url);
          } else {
            // this.clearLoading();
            this.loadingData = false;
            this.loadingReportMessage = false;

            this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
          }
        },
        error => {
          // this.clearLoading();
          this.loadingData = false;
          this.loadingReportMessage = false;
        }
      );
    } else {
      // this.clearLoading();
      this.loadingData = false;
      this.loadingReportMessage = false;
      this.toastr.info('End date must be greater than start date', 'Date Selection');
    }
  }



}
