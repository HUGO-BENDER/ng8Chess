import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyChessInfoComponent } from './crazy-chess-info.component';

describe('CrazyChessInfoComponent', () => {
  let component: CrazyChessInfoComponent;
  let fixture: ComponentFixture<CrazyChessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyChessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyChessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
