import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowInfoComponent } from './flow-info.component';

describe('FlowInfoComponent', () => {
  let component: FlowInfoComponent;
  let fixture: ComponentFixture<FlowInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
