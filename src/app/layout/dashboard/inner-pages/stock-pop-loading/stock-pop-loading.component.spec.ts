import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPopLoadingComponent } from './stock-pop-loading.component';

describe('StockPopLoadingComponent', () => {
  let component: StockPopLoadingComponent;
  let fixture: ComponentFixture<StockPopLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPopLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPopLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
