import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../layout/dashboard/dashboard.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: any = {
        userName: '',
        password: ''
    };
    loading=false;
    constructor(private router: Router,private httpService:DashboardService,private toastr:ToastrService) {}

  
    ngOnInit() {

        localStorage.clear();
     }

    onLogin(loginForm: any) {
        this.loading=true;
        console.log(loginForm);


        this.httpService.login(loginForm).subscribe((data:Response) => {
            const res: any = data;
            localStorage.clear();   
            // console.log('data', data.headers);
            // this.toastr.success(res, 'Login Status');
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('today',moment(new Date).format('YYYY-MM-DD'))
            localStorage.setItem('user_id', res.user.user_id);
            localStorage.setItem('regionId', res.user.regionId);
            localStorage.setItem('user_name', res.user.userName);
            localStorage.setItem('menu', JSON.stringify(res.list));

            if(res.user.typeID==16)
            this.router.navigate(['/dashboard/merchandiser_List']);
            else
            this.router.navigate(['/dashboard']);

            

            setTimeout(() => {
                this.loading=false;
            }, 30000);

        }, (error:HttpErrorResponse) => {


            this.toastr.error(error.message, 'Login Status');
            console.log('error', error);
            this.loading=false;

            


        });
    }
}
