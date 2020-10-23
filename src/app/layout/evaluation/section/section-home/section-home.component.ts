import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import { EvaluationService } from "../../evaluation.service";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-section-home",
  templateUrl: "./section-home.component.html",
  styleUrls: ["./section-home.component.scss"],
})
export class SectionHomeComponent implements OnInit {
  data: any = [];
  ip = environment.ip;
  loading = false;
  selectedShop: any = {};
  clickCount = 0;

  @ViewChild("childModal") childModal: ModalDirective;
  @ViewChild("remarksModal") remarksModal: ModalDirective;

  score: any = 0;

  indexList: any = [];
  surveyId: any = 0;
  remarksList: any = [];
  selectedRemarks: any = false;
  selectedRemarksList: any = [];
  selectedCriteria: any;
  evaluationArray: any = [];
  productList: any = [];
  msl: any;
  availabilityCount: number;
  cloneArray: any = [];
  isFromShop: boolean = true;
  rotationDegree: number = 0;
  isEditable: any = false;
  surveyorId: any;
  visitDay: any;
  constructor(
    private toastr: ToastrService,
    private activatedRoutes: ActivatedRoute,
    private httpService: EvaluationService
  ) {
    this.surveyId;
    this.httpService.ip;
    this.activatedRoutes.queryParams.subscribe((q) => {
      if (q.location) this.isFromShop = false;
    });
    this.activatedRoutes.params.subscribe((params) => {
      this.surveyId = params.id;

      let obj = {
        surveyId: this.surveyId,
        userTypeId: localStorage.getItem("user_type"),
      };

      this.getData(obj);
    });
  }

  ngOnInit() {}

  rotateImage() {
    if (this.rotationDegree == 360) {
      this.rotationDegree = 90;
    } else {
      this.rotationDegree += 90;
    }
  }
  getData(obj) {
    this.httpService.getShopDetails(obj).subscribe(
      (data: any) => {
        if (data) {
          this.data = data;

          document.title = this.data.section[0].sectionTitle;
          if (this.data.criteria) {
            this.evaluationArray = this.data.criteria;
            this.selectedCriteria = this.data.criteria[0].id;
            this.cloneArray = this.evaluationArray.slice();
            this.remarksList = data.remarks;
          }

          // this.remarksList=this.data.remarks;
          this.productList = this.data.productList;

          localStorage.setItem("productList", JSON.stringify(this.productList));
          // this.msl=this.data.msl;
          // this.isEditable=this.data.isEditable || this.isEditable;
          // if(this.productList.length>0)
          // this.availabilityCount=this.getAvailabilityCount(this.productList);
          // if(this.data.criteria)
          // this.calculateScore();
        }
      },
      (error) => {}
    );
  }

  calculateMSLAgain(products) {
    this.msl = this.data.msl;
    localStorage.setItem("productList", JSON.stringify(products));
    this.productList = localStorage.getItem("productList");

    this.availabilityCount = this.getAvailabilityCount(products);
  }

  getAvailabilityCount(products) {
    if (!products) {
      products = localStorage.getItem("productList");
    }
    let pro = products.map((p) => p.available_sku);
    let sum = pro.reduce((a, v) => a + v);
    return (sum / pro.length) * this.msl;
  }

  getCriteriaWithRemarks(remarks, criteria) {
    let obj = {
      remarkId: remarks,
      id: criteria,
      // title: criteria.title,
      // score: this.selectedCriteria
    };
    this.cloneArray.forEach((element) => {
      var i = this.cloneArray.findIndex((e) => e.id == criteria.id);
      this.cloneArray.splice(i, 1, obj);
    });

    // this.evaluationArray.push(obj);
    // this.hideRemarksModal();
    // this.selectedRemarks = ''
  }

  checkboxChange(event, id) {


    if (!event.checked) this.selectedRemarksList.push(id);
    else {
      for (var i = 0; i < this.selectedRemarksList.length; i++) {
        if (this.selectedRemarksList[i] == id) {
          this.selectedRemarksList.splice(i, 1);
        }
      }
    }
    // this.selectedRemarksList.pop(id)


  }
  // counter(event,criteria,index){


  //   if(event.checked){
  //     this.score=this.score-criteria.score;
  //     this.indexList.push(index);

  //     this.selectedCriteria=criteria
  //     this.showRemarksModal();

  //   }
  //   else{
  //     this.score=this.score+criteria.score;
  //     let i=this.indexList.findIndex(i=>i==index)
  //     this.indexList.splice(i,1);

  //     if(this.evaluationArray.length>0){
  //       let obj={
  //         id:criteria.id,
  //         title:criteria.title,
  //         score:criteria.score,
  //         remarkId:0
  //       }
  //       let e=this.evaluationArray.findIndex(i=>i.id==criteria.id)
  //       this.cloneArray.splice(e,1,obj);

  //     }

  //   }
  // }

  calculateScore() {
    this.score;
    this.data.criteria.map((c) => {
      this.score += c.score;
    });
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.rotationDegree = 0;
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  cancelSelection() {
    this.selectedRemarksList = [];
    this.selectedCriteria = 1;
    this.hideRemarksModal();
  }

  evaluateShop() {
    this.clickCount = 1;
    
    for (const element of this.data.shopDetails.tagsList) {
      // tslint:disable-next-line:triple-equals
      if (element.heading == "surveyorId") {
        this.surveyorId = element.value;
        // tslint:disable-next-line:triple-equals
      } else if (element.heading == "Visit Date") {
        this.visitDay = element.value;
      }
    }
    let obj = {
      criteriaId: this.selectedCriteria,
      surveyId: this.surveyId,
      evaluatorId: localStorage.getItem("user_id"),
      remarksId: this.selectedRemarksList,
      surveyorId: this.surveyorId,
      visitDate: this.visitDay,
    };
    this.httpService.evaluateShop(obj).subscribe(
      (data: any) => {
        this.loading = false;

        if (data.success) {
          this.toastr.success("shop evaluated successfully ");
          this.selectedRemarksList = [];

          setTimeout(() => {
            window.close();
          }, 2000);
        } else {
          this.toastr.info(data.errorMessage, "Info");
        }
      },
      (error) => {
        // window.close()
        this.loading = false;
        this.toastr.error(error.message, "Error");
      }
    );
  }

  clearCheckboxes() {
    var inputs: any = document.querySelectorAll(".checkbox");
    for (var j = 0; j < inputs.length; j++) {
      if (this.selectedCriteria.id == inputs[j].id) inputs[j].checked = false;
    }
  }

  showRemarksModal() {
    if (this.selectedCriteria == 1) {
      this.selectedRemarksList = [];
      this.remarksModal.show();
    } else this.selectedRemarksList = [];
  }
  hideRemarksModal() {
    // if(!!this.selectedRemarks)
    this.remarksModal.hide();
    // else{
    //   this.toastr.info(`please select remarks for "${this.selectedCriteria.title}"`)
    // }
  }
}
