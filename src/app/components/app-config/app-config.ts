
export interface AppGridConfig {
  cols: number;
  rowHeight: string;
  gutterSize: string;
  JoinOrCreateGame: {
    colsSpan: number;
    rowsSpan: number;
    CreateGameSubGrid: {
      cols: number;
      rowHeight: string;
      gutterSize: string;
    }
  };
  GamesInProgress: {
    colsSpan: number;
    rowsSpan: number;
  };
  UserProfile: {
    colsSpan: number;
    rowsSpan: number;
  };
}

export interface GameCard {
  id: string;
  order: number;
  colsSpan: number;
  rowsSpan: number;
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
      colsSpan: 3,
      rowsSpan: 2,
      CreateGameSubGrid: {
        cols: 2,
        rowHeight: '450px',
        gutterSize: '0px'
      }
    },
    GamesInProgress: {
      colsSpan: 3,
      rowsSpan: 1
    },
    UserProfile: {
      colsSpan: 3,
      rowsSpan: 1
    }
  };

  private listgames: Array<GameCard> = [
    {
      id: 'chess',
      order: 0,
      colsSpan: 1,
      rowsSpan: 1,
      isActive: true,
      isPlayable: true,
      title: 'Game.Chess.Title',
      subtitle: 'Game.Chess.Subtitle',
      image48Path: '../../../assets/games/chess/chess_48.png',
      bkPath: '../../../assets/games/chess/256x256.png',
      description: 'Game.Chess.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'crazychess',
      order: 1,
      colsSpan: 1,
      rowsSpan: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Crazychess.Title',
      subtitle: 'Game.Crazychess.Subtitle',
      image48Path: '../../../assets/games/crazychess/crazychess_48.png',
      bkPath: '../../../assets/games/chess/bkGame.png',
      description: 'Game.Crazychess.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'chinker',
      order: 2,
      colsSpan: 1,
      rowsSpan: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Chinker.Title',
      subtitle: 'Game.Chinker.Subtitle',
      image48Path: '../../../assets/games/chinker/chinker_48.png',
      bkPath: '../../../assets/games/chess/bkGame.png',
      description: 'Game.Chinker.Description',
      maxPlayers: 2,
      minPlayers: 2
    },
    {
      id: 'flow',
      order: 3,
      colsSpan: 1,
      rowsSpan: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Flow.Title',
      subtitle: 'Game.Flow.Subtitle',
      image48Path: '../../../assets/games/flow/phaser.png',
      bkPath: '../../../assets/games/chess/bkGame.png',
      description: 'Game.Flow.Description',
      maxPlayers: 1,
      minPlayers: 1
    },
    {
      id: 'babydontcry',
      order: 4,
      colsSpan: 1,
      rowsSpan: 1,
      isActive: false,
      isPlayable: false,
      title: 'Game.Babydontcry.Title',
      subtitle: 'Game.Babydontcry.Subtitle',
      image48Path: '../../../assets/games/flow/flow_48.png',
      bkPath: '../../../assets/games/chess/bkGame.png',
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
