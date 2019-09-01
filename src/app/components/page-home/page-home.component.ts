import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseApp from 'firebase';
// import { AngularFirestore, AngFirularestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

// -- Games public Info
import { ChessInfoComponent } from '../../games/chess/chess-info/chess-info.component';
import { CrazyChessInfoComponent } from '../../games/crazy-chess/crazy-chess-info/crazy-chess-info.component';
import { ChinkerInfoComponent } from '../../games/chinker/chinker-info/chinker-info.component';
import { FlowInfoComponent } from '../../games/flow/flow-info/flow-info.component';
// -- Games setup new recruitment
import { ChessNewGameComponent } from '../../games/chess/chess-new-game/chess-new-game.component';
import { CrazyChessNewGameComponent } from '../../games/crazy-chess/crazy-chess-new-game/crazy-chess-new-game.component';
import { ChinkerNewGameComponent } from '../../games/chinker/chinker-new-game/chinker-new-game.component';


// -- Services
import { RecruitmentService } from 'src/app/services/angularfire/Recruitment.service';
import { PlayerService } from 'src/app/services/angularfire/player.service';

// -- Model d.ts
import { Recruitment, recruitmentState } from 'src/app/model/recruitment';
import { MinInfoPlayer } from 'src/app/model/player';
import { GameInProgress } from 'src/app/model/gamebase';



@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {
  inSmallScreen: boolean;
  inMediumScreen: boolean;
  gamesInProgress: Observable<GameInProgress[]>;
  recruitments: Observable<Recruitment[]>;
  userlogined: firebase.User;
  dialogRef: MatDialogRef<any>;

  // ----- hay que sacarlo
  matGridSetup = {
    cols: 3,
    rowHeight: '400px',
    gutterSize: '0px',
    JoinOrCreateGame: {
      cols: 3,
      rows: 1
    },
    GamesInProgress: {
      cols: 3,
      rows: 1
    }
  };

  listgames = [
    {
      id: 'chess',
      title: 'Chess',
      subtitle: 'Clasic chess',
      image48Path: '../../../assets/games/chess/chess_48.png',
      description: 'key-description-for-translate'
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
  // ---- hasta aca
  constructor(private translate: TranslateService,
              public au: AngularFireAuth,
              private fireRecruitment: RecruitmentService,
              private firePlayer: PlayerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.au.authState.subscribe(user => {
      if (user) {
        this.userlogined = user;
        this.gamesInProgress = this.firePlayer.getGamesInProgress(user).pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as GameInProgress;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
      } else {
        this.userlogined = null;
        this.gamesInProgress = null;
      }
    });

    this.recruitments = this.fireRecruitment.getRecruitments().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recruitment;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );






  }

  showInfo(idGame: string) {

    switch (idGame) {
      case 'chess':
        this.dialogRef = this.dialog.open(ChessInfoComponent);
        break;
      case 'crazychess':
        this.dialogRef = this.dialog.open(CrazyChessInfoComponent);
        break;
      case 'chinker':
        this.dialogRef = this.dialog.open(ChinkerInfoComponent);
        break;
      case 'flow':
        this.dialogRef = this.dialog.open(FlowInfoComponent);
        break;
      default:
        this.dialogRef = null;
        break;
    }



  }

  quickStart(idGame: string) {
    let dialogRefNewQuickGame: MatDialogRef<any> = null;
    switch (idGame) {
      case 'chess':
        // -- create game
        let player1: MinInfoPlayer = { uid: 'anonymousPlayer1', displayName: 'Player1' };
        if (this.userlogined) {
          player1 = { uid: this.userlogined.uid, displayName: this.userlogined.displayName };
        }
        const player2: MinInfoPlayer = { uid: 'anonymousPlayer2', displayName: 'Player2' };
        const arrayPlayers: Array<MinInfoPlayer> = [];
        arrayPlayers.push(player1);
        arrayPlayers.push(player2);
        const newRecruitment: Recruitment = {
          id: this.fireRecruitment.createId(),
          gameType: 'quickStartChess',
          name: 'quickStartChess',
          dateCreation: firebaseApp.database.ServerValue.TIMESTAMP,
          state: recruitmentState.CLOSED,
          creator: player1,
          players: arrayPlayers,
          countPlayers: 2,
          minPlayers: 2,
          maxPlayers: 2,
          config: {}
        };
        this.fireRecruitment.createGameFromThisRecruitment(newRecruitment)
          .then(() => {
            dialogRefNewQuickGame = this.dialog.open(ChessNewGameComponent, {
              data: { action: 'quickStart', docId: newRecruitment.id }
            });
          }
          ).catch(function(error) {
            this.ShowErrorMessage(error);
            console.error('Error adding document: ', error);
          });
        break;
      case 'crazychess':
        dialogRefNewQuickGame = this.dialog.open(CrazyChessNewGameComponent, {
          data: { action: 'quickStart' }
        });
        break;
      case 'chinker':
        dialogRefNewQuickGame = this.dialog.open(ChinkerNewGameComponent, {
          data: { action: 'quickStart' }
        });
        break;
      case 'flow':
        // --  naaaaaa
        break;
      default:
        dialogRefNewQuickGame = null;
        break;
    }
    if (dialogRefNewQuickGame) {
      dialogRefNewQuickGame.afterClosed().subscribe(result => {
        if (result) {

          alert('volvimos del setup');

        } else {
          alert('volvimos del setup pero vacios');
        }
      });
    }








  }


  createRecruitment(idGame: string) {
    let dialogRefNewGame: MatDialogRef<any> = null;
    if (this.userlogined) {
      switch (idGame) {
        case 'chess':
          dialogRefNewGame = this.dialog.open(ChessNewGameComponent, {
            data: { action: 'createRecruitment' }
          });
          break;
        case 'crazychess':
          dialogRefNewGame = this.dialog.open(CrazyChessNewGameComponent, {
            data: { action: 'createRecruitment' }
          });
          break;
        case 'chinker':
          dialogRefNewGame = this.dialog.open(ChinkerNewGameComponent, {
            data: { action: 'createRecruitment' }
          });
          break;
        case 'flow':
          // --  naaaaaa
          break;
        default:
          dialogRefNewGame = null;
          break;
      }


      dialogRefNewGame.afterClosed().subscribe(result => {
        if (result) {

          alert('volvimos del setup');

        } else {
          alert('volvimos del setup pero vacios');
        }
      });






      // const player1: MinInfoPlayer = { uid: this.userlogined.uid, displayName: this.userlogined.displayName };
      // const arrayPlayers: Array<MinInfoPlayer> = [];
      // arrayPlayers.push(player1);
      // const newRecruitment: Recruitment = {
      //   gameType: idGame,
      //   name: 'setup.name',
      //   description: 'setup.description',
      //   dateCreation: firebaseApp.database.ServerValue.TIMESTAMP,
      //   state: recruitmentState.OPEN,
      //   creator: player1,
      //   players: arrayPlayers,
      //   countPlayers: 1,
      //   maxPlayers: 2,
      //   config: {}
      // };
      // this.fireRecruitment.createRecruitment(newRecruitment)
      //   .then((docRef) => {
      //     Swal.fire({
      //       position: 'top',
      //       type: 'success',
      //       title: this.translate.instant('xxxHas creado un juego'),
      //       text: 'setup.name' + ' ' + 'setup.description',
      //       showConfirmButton: false,
      //       timer: 2000
      //     });
      //     console.log('Document written with ID: ', docRef.id);
      //   })
      //   .catch(function (error) {
      //     this.ShowErrorMessage(error);
      //     console.error('Error adding document: ', error);
      //   });





    } else {
      // tslint:disable-next-line: max-line-length
      this.ShowErrorMessage('xNo se puede ejecutar esta acción sin estar loginado\n\r Puede loginarse como invitado. no es necesario crear una cuenta pero no se guardaran los datos de su partida.');
    }
  }

  openGame(gameInProgress: GameInProgress) {
    throw new Error('Method not implemented.');
  }

  canDelete(r: Recruitment): boolean {
    if (this.userlogined) {
      if (r.creator.uid === this.userlogined.uid) {
        return true;
      }
    }
    return false;
  }

  deleteRecruitment(r: Recruitment) {
    this.fireRecruitment.deleteRecruitment(r)
      .then(() => {
        this.translate.get('pagHome.xxxGame_delete.').subscribe(
          (res: string) => {
            this.ShowToastMessage(res);
            this.dialogRef.close();
          }
        );
      })
      .catch(function(error) {
        this.ShowErrorMessage('xError deleting game.');
      });
  }

  canJoin(r: Recruitment): boolean {
    if (this.userlogined) {
      if (r.creator.uid !== this.userlogined.uid) {
        return true;
      }
      return false;
    }
    // -- Si no está loginado queremos que intente unirse para invitarlo
    return true;
  }

  joinRecruitment(r: Recruitment) {
    // if (this.userlogined) {
    //   this.afsRecruitments.joinRecruitment(r, this.userlogined)
    //     .then(
    //       () => this.checkIfRoomReady(r),
    //       err => this.ShowToastMessage(err)
    //     )
    //     .catch(function (error) {
    //       console.error('Error editing document: ', error);
    //     });
    // } else {
    //   this.ShowErrorMessage('xNo se puede ejecutar esta acción sin estar loginado\n\r
    // Puede loginarse como invitado. no es necesario crear una cuenta pero no se guardaran los datos de su partida.');
    // }
  }




  // -- config show messages
  private ShowToastMessage(msg: string): void {
    Swal.fire({
      toast: true,
      position: 'top',
      type: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    });
  }
  private ShowErrorMessage(msg: string): void {
    Swal.fire({
      type: 'error',
      title: this.translate.instant('Error'),
      text: msg,
      showConfirmButton: true
    });
  }

}
