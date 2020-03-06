import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare const google: any;
@Component({
  selector: 'section-four',
  templateUrl: './section-four.component.html',
  styleUrls: ['./section-four.component.scss']
})
export class SectionFourComponent implements OnInit {


@Input('data') data;
locations: any = [];
centerPoint: any = [];
lat: any;
long: any;
mapSrc: SafeResourceUrl;
url: any;
// mapSrc: any;
constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;


    this.lat = this.data.mslTable[0].latitude;
    this.long = this.data.mslTable[0].longitude;

    this.url = 'https://maps.google.com/maps?q=' + this.lat + '%2C' + this.long + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);





    this.data = changes.data.currentValue;
    this.locations = [];
    this.centerPoint = [];
    let i = 0;
    this.data.mslTable.forEach(e => {
      let locationElement = [e.shop_title+"</br>"+e.visit_datetime, parseFloat(e.latitude), parseFloat(e.longitude), i];
      this.locations.push(locationElement);

      if (i == 0) this.centerPoint = [parseFloat(e.latitude), parseFloat(e.longitude)];

      ++i;
    });

  }

}
