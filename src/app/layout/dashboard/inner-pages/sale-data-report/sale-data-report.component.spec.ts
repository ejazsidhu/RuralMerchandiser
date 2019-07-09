import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDataReportComponent } from './sale-data-report.component';

describe('SaleDataReportComponent', () => {
  let component: SaleDataReportComponent;
  let fixture: ComponentFixture<SaleDataReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleDataReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
