import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdwordsComponent } from './adwords.component';

describe('AdwordsComponent', () => {
  let component: AdwordsComponent;
  let fixture: ComponentFixture<AdwordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdwordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
