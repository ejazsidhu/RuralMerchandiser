import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  user_id:any=0;

  
  // ip: any='http://192.168.3.209:8080/audit/';
  ip: any='http://192.168.3.189:8080/audit/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };

  constructor(private http:HttpClient) {
    this.user_id=localStorage.getItem('user_id')

   }

   public login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
  
  }
}
