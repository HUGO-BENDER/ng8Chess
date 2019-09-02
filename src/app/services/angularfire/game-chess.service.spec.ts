import { TestBed } from '@angular/core/testing';

import { GameChessService } from './game-chess.service';

describe('GameChessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameChessService = TestBed.get(GameChessService);
    expect(service).toBeTruthy();
  });
});
