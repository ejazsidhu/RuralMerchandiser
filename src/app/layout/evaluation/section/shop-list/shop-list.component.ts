import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../../evaluation.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  tableData:any=[];      
  headingsList:any =[]; 
  loading=true;
  constructor(private router:Router,private toastr:ToastrService,private httpService:EvaluationService,private activeRoute:ActivatedRoute) {
   
    this.activeRoute.queryParams.subscribe(p=>{

      if(p.surveyorId && p.startDate && p.endDate){
        // let obj=p;
        this.getTableData(p);
      }
    
    })

   }

  ngOnInit() {
    // this.getTableData();
  }

  getTableData(obj){
    // let date='2019-04-29';//new Date();
    // let obj={
    //   startDate:moment(date).format('YYYY-MM-DD'),
    //   endDate:moment(date).format('YYYY-MM-DD')
    // }

    this.httpService.getData(obj).subscribe(data=>{
      // console.log(data);
      this.tableData=data;
      if(this.tableData.length==0){
        this.loading=false;
        this.toastr.info('No record found.');
        setTimeout(() => {
        this.router.navigate(['/dashboard/merchandiser_List'])
          
        }, 3000);
      }
    this.headingsList=Object.keys(data);

    },error=>{})
    

  }

  gotoNewPage(id){  
    window.open(`/dashboard/evaluation/shop_list/details/${id}`,'_blank')
    }
 

}