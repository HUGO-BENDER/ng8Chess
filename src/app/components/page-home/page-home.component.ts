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

// -- Config app
import { AppConfig, GameCard, AppGridConfig, getMatGridConfig } from '../app-config/app-config';
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
import { GlobaldataService } from 'src/app/services/angularfire/globaldata.service';
import { RecruitmentService } from 'src/app/services/angularfire/Recruitment.service';
import { PlayerService } from 'src/app/services/angularfire/player.service';
import { GameChessService } from 'src/app/services/angularfire/game-chess.service';

// -- Model d.ts
import { Recruitment, recruitmentState } from 'src/app/model/recruitment';
import { MinInfoPlayer } from 'src/app/model/player';
import { GameInProgress } from 'src/app/model/gamebase';



@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css'],
  providers: [AppConfig]
})
export class PageHomeComponent implements OnInit {
  inSmallScreen: boolean;
  inMediumScreen: boolean;
  inLargeScreen: boolean;
  gamesInProgress: Observable<GameInProgress[]>;
  recruitments: Observable<Recruitment[]>;
  userlogined: firebase.User;
  dialogRef: MatDialogRef<any>;
  matGridSetup: AppGridConfig;
  listgames: Array<GameCard>;

  constructor(private translate: TranslateService,
              public au: AngularFireAuth,
              private fireRecruitment: RecruitmentService,
              private fireData: GlobaldataService,
              private firePlayer: PlayerService,
              private fireChess: GameChessService,
              public dialog: MatDialog,
              public breakpointObserver: BreakpointObserver,
              public appConfig: AppConfig) { }

  ngOnInit() {
    this.matGridSetup = this.appConfig.getGridConfig();
    this.listgames = this.appConfig.getGamesList();
    this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        this.inSmallScreen = state.matches;
        this.makeResponsive();
      });
    this.breakpointObserver
      .observe(['(max-width: 900px)'])
      .subscribe((state: BreakpointState) => {
        this.inMediumScreen = state.matches;
        this.makeResponsive();
      });
      this.breakpointObserver
      .observe(['(max-width: 1500px)'])
      .subscribe((state: BreakpointState) => {
        this.inLargeScreen = state.matches;
        this.makeResponsive();
      });
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

    // alert(getMatGridConfig());

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
    let dataParam: any = null;
    switch (idGame) {
      case 'chess':
        // this.fireChess.createGameQuickStart(this.userlogined)
        //   .then((docRef) => {
        //     dataParam = { action: 'quickStart', gameId: docRef.id };
        //     dialogRefNewQuickGame = this.dialog.open(ChessNewGameComponent, {
        //       data: dataParam
        //     });
        //     dialogRefNewQuickGame.afterClosed().subscribe(result => {
        //       if (!result) {
        //         this.translate.get('xxOh no vas a jugar?. Te esperamos una proxima vez.').subscribe((res: string) => {
        //           this.ShowToastMessage(res);
        //           this.fireChess.deleteGameQuickStart(dataParam.gameId);
        //         });
        //       }
        //     });
        //   }
        //   ).catch(function(error) {
        //     this.ShowErrorMessage(error);
        //     console.error('Error adding document: ', error);
        //   });

        dataParam = { action: 'quickStart', gameId: 'meSqA7bSd3S6w3K9f1J7' };
        dialogRefNewQuickGame = this.dialog.open(ChessNewGameComponent, {
          data: dataParam
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

  makeResponsive(): void {
    if (this.inSmallScreen) {
      this.matGridSetup.cols = 1;
      this.matGridSetup.JoinOrCreateGame.cols = 1;
      this.matGridSetup.GamesInProgress.cols = 1;
      this.matGridSetup.JoinOrCreateGame.CardMaxWidth = '96%';
      this.matGridSetup.JoinOrCreateGame.CardMinWidth = '96%';
      console.log('inSmallScreen');
    } else if (this.inMediumScreen) {
        this.matGridSetup.cols = 2;
        this.matGridSetup.JoinOrCreateGame.cols = 1;
        this.matGridSetup.GamesInProgress.cols = 1;
        this.matGridSetup.JoinOrCreateGame.CardMaxWidth = '96%';
        this.matGridSetup.JoinOrCreateGame.CardMinWidth = '96%';
        console.log('inMediumScreen');
      } else if (this.inLargeScreen) {
        this.matGridSetup.cols = 2;
        this.matGridSetup.JoinOrCreateGame.cols = 1;
        this.matGridSetup.GamesInProgress.cols = 1;
        this.matGridSetup.JoinOrCreateGame.CardMaxWidth = '96%';
        this.matGridSetup.JoinOrCreateGame.CardMinWidth = '46%';
        console.log('inLargeScreen');
      } else {
        this.matGridSetup.cols = 3;
        this.matGridSetup.JoinOrCreateGame.cols = 2;
        this.matGridSetup.GamesInProgress.cols = 1;
        this.matGridSetup.JoinOrCreateGame.CardMaxWidth = '46%';
        this.matGridSetup.JoinOrCreateGame.CardMinWidth = '30%';
        console.log('muy grande');
      }

  }
}
