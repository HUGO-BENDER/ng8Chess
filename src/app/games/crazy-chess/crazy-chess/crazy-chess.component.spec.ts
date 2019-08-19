import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyChessComponent } from './crazy-chess.component';

describe('CrazyChessComponent', () => {
  let component: CrazyChessComponent;
  let fixture: ComponentFixture<CrazyChessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyChessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
