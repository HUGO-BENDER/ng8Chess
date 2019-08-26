import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinkerInfoComponent } from './chinker-info.component';

describe('ChinkerInfoComponent', () => {
  let component: ChinkerInfoComponent;
  let fixture: ComponentFixture<ChinkerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinkerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinkerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
