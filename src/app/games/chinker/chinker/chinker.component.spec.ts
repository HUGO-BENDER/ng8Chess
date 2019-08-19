import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinkerComponent } from './chinker.component';

describe('ChinkerComponent', () => {
  let component: ChinkerComponent;
  let fixture: ComponentFixture<ChinkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
