import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarAdwordsComponent } from './toolbar-adwords.component';

describe('ToolbarAdwordsComponent', () => {
  let component: ToolbarAdwordsComponent;
  let fixture: ComponentFixture<ToolbarAdwordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarAdwordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarAdwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
