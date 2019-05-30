import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 
  // ip: any='http://192.168.3.209:8080/audit/';
  ip: any='http://192.168.3.189:8080/audit/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    withCredentials: true
  };
  user_id:any=0;
 

  constructor(private http:HttpClient) {
    this.user_id=localStorage.getItem('user_id')

   }

   public login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
  
  }
  
  getMerchandiserListForEvaluation(obj){

    let urlEncode=this.UrlEncodeMaker(obj)
    const url = this.ip + 'merchandiserList';
    return this.http.post(url, urlEncode,this.httpOptions);
  }

  getRegion() {
      const filter = JSON.stringify({ act: 7});
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
   
  }

  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;


    const form = document.createElement('form');

    form.setAttribute('action', path);

    form.setAttribute('method', 'post');
    // form.setAttribute('target', '_blank');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);


  }
  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach(key => {
      const input = document.createElement('input');

      input.setAttribute('value', obj[key]);

      input.setAttribute('name', key);

      form.appendChild(input);
    });
  }
  UrlEncodeMaker(obj) {
    let url = '';
      for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getKeyForReport(reportUrl,body) {
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);
  
  }
}
