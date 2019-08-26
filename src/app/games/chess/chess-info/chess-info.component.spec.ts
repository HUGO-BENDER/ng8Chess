import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessInfoComponent } from './chess-info.component';

describe('ChessInfoComponent', () => {
  let component: ChessInfoComponent;
  let fixture: ComponentFixture<ChessInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChessInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
