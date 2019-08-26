import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessNewGameComponent } from './chess-new-game.component';

describe('ChessNewGameComponent', () => {
  let component: ChessNewGameComponent;
  let fixture: ComponentFixture<ChessNewGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessNewGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
