
export interface AppGridConfig {
  cols: number;
  rowHeight: string;
  gutterSize: string;
  JoinOrCreateGame: {
    cols: number;
    rows: number;
    CardWidth: string;
  };
  GamesInProgress: {
    cols: number;
    rows: number;
  };
}

export interface GameCard {
    id: string;
    title: string;
    subtitle: string;
    image48Path: string;
    description: string;
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
        rows: 1,
        CardWidth: '96%'
      },
      GamesInProgress: {
        cols: 3,
        rows: 1
      }
    };

    private listgames: Array<GameCard> = [
      {
        id: 'chess',
        title: 'Game.Chess.Title',
        subtitle: 'Game.Chess.Subtitle',
        image48Path: '../../../assets/games/chess/chess_48.png',
        description: 'Game.Chess.Description'
      },
      {
        id: 'crazychess',
        title: 'Crazy chess',
        subtitle: 'Change the rules!!!',
        image48Path: '../../../assets/games/crazychess/crazychess_48.png',
        description: 'key-description-for-translate'
      },
      {
        id: 'chinker',
        title: 'Chinker',
        subtitle: 'Chin-(Chon + Po)-ker',
        image48Path: '../../../assets/games/chinker/chinker_48.png',
        description: 'key-description-for-translate'
      },
      {
        id: 'flow',
        title: 'Flow',
        subtitle: 'Flow original from Phaser',
        image48Path: '../../../assets/games/chinker/chinker_48.png',
        description: 'key-description-for-translate'
      }
    ];

      getGridConfig() {
          return this.matGridSetup;
      }
      getGamesList() {
          return this.listgames;
      }
  }
