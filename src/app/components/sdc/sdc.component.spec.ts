import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdcComponent } from './sdc.component';

describe('SdcComponent', () => {
  let component: SdcComponent;
  let fixture: ComponentFixture<SdcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
