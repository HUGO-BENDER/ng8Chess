import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyChessNewGameComponent } from './crazy-chess-new-game.component';

describe('CrazyChessNewGameComponent', () => {
  let component: CrazyChessNewGameComponent;
  let fixture: ComponentFixture<CrazyChessNewGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyChessNewGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyChessNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
