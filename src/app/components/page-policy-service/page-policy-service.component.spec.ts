import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePolicyServiceComponent } from './page-policy-service.component';

describe('PagePolicyServiceComponent', () => {
  let component: PagePolicyServiceComponent;
  let fixture: ComponentFixture<PagePolicyServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePolicyServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePolicyServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
