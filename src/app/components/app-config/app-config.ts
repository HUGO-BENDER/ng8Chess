
export interface AppGridConfig {
  cols: number;
  rowHeight: string;
  gutterSize: string;
  JoinOrCreateGame: {
    cols: number;
    rows: number;
    CreateGameSubGrid: {
      cols: number;
      rowHeight: string;
      gutterSize: string;
    }
  };
  GamesInProgress: {
    cols: number;
    rows: number;
  };
}

export interface GameCard {
  id: string;
  order: number;
  colsInGrid: number;
  rowsInGrid: number;
  isActive: boolean;
  isPlayable: boolean;
  title: string;
  subtitle: string;
  image48Path: string;
  bkPath: string;
  description: string;
  maxPlayers: number;
  minPlayers: number;
}


export function getMatGridConfig() {
  return 'HOLA MUNDO';
}




export class AppConfig {
  private matGridSetup: AppGridConfig = {
    cols: 3,
    rowHeight: '400px',
    gutterSize: '0px',
    JoinOrCreateGame: {
      cols: 3,
      rows: 2,
      CreateGameSubGrid: {
        cols: 2,
        rowHeight: '280px',
        gutterSize: '0px'
      }
    },
    GamesInProgress: {
      cols: 3,
      rows: 1
    }
  };

  private listgames: Array<GameCard> = [
    {
      id: 'chess',
      order: 0,
      colsInGrid: 1,
      rowsInGrid: 1,
      isActive: true,
      isPlayable: true,
      title: 'Game.Chess.Title',
      subtitle: 'Game.Chess.Subtitle',
      image48Path: '../../../assets/games/chess/chess_48.png',
      bkPath: '../../../assets/games/chess/bkGame.png',
      description: 'Game.Chess.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'crazychess',
      order: 1,
      colsInGrid: 1,
      rowsInGrid: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Crazychess.Title',
      subtitle: 'Game.Crazychess.Subtitle',
      image48Path: '../../../assets/games/crazychess/crazychess_48.png',
      bkPath: '../../../assets/games/chess/bkgame.png',
      description: 'Game.Crazychess.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'chinker',
      order: 2,
      colsInGrid: 1,
      rowsInGrid: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Chinker.Title',
      subtitle: 'Game.Chinker.Subtitle',
      image48Path: '../../../assets/games/chinker/chinker_48.png',
      bkPath: '../../../assets/games/chess/bkgame.png',
      description: 'Game.Chinker.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'flow',
      order: 3,
      colsInGrid: 1,
      rowsInGrid: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Flow.Title',
      subtitle: 'Game.Flow.Subtitle',
      image48Path: '../../../assets/games/flow/phaser.png',
      bkPath: '../../../assets/games/chess/bkgame.png',
      description: 'Game.Flow.Description',
      maxPlayers: 1,
      minPlayers: 1
    },
    {
      id: 'babydontcry',
      order: 4,
      colsInGrid: 1,
      rowsInGrid: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Babydontcry.Title',
      subtitle: 'Game.Babydontcry.Subtitle',
      image48Path: '../../../assets/games/flow/flow_48.png',
      bkPath: '../../../assets/games/chess/bkgame.png',
      description: 'Game.Babydontcry.Description',
      maxPlayers: 1,
      minPlayers: 1
    }
  ];

  getGridConfig() {
    return this.matGridSetup;
  }
  getGamesList() {
    return this.listgames;
  }
}
