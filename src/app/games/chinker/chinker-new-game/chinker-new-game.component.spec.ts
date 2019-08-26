import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinkerNewGameComponent } from './chinker-new-game.component';

describe('ChinkerNewGameComponent', () => {
  let component: ChinkerNewGameComponent;
  let fixture: ComponentFixture<ChinkerNewGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinkerNewGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinkerNewGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
