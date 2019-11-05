import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebaseApp from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

// -- Config app
import { AppConfig, GameCard, AppGridConfig } from '../../app-config/app-config';
// -- Games public Info
import { ChessInfoComponent } from '../../../games/chess/chess-info/chess-info.component';
import { CrazyChessInfoComponent } from '../../../games/crazy-chess/crazy-chess-info/crazy-chess-info.component';
import { ChinkerInfoComponent } from '../../../games/chinker/chinker-info/chinker-info.component';
import { FlowInfoComponent } from '../../../games/flow/flow-info/flow-info.component';
// -- Games setup new recruitment
import { ChessNewGameComponent } from '../../../games/chess/chess-new-game/chess-new-game.component';
import { CrazyChessNewGameComponent } from '../../../games/crazy-chess/crazy-chess-new-game/crazy-chess-new-game.component';
import { ChinkerNewGameComponent } from '../../../games/chinker/chinker-new-game/chinker-new-game.component';
// -- Services
import { RecruitmentService } from 'src/app/services/angularfire/Recruitment.service';
import { GameChessService } from 'src/app/services/angularfire/game-chess.service';




@Component({
  // tslint:disable-next-line: component-selector
  selector: 'home-create-game',
  templateUrl: './home-create-game.component.html',
  styleUrls: ['./home-create-game.component.css']
})
export class HomeCreateGameComponent implements OnInit {
  userlogined: firebase.User;
  dialogRef: MatDialogRef<any>;
  matGridSetup: AppGridConfig;
  listgames: Array<GameCard>;

  constructor(private translate: TranslateService,
    public au: AngularFireAuth,
    public dialog: MatDialog,
    public appConfig: AppConfig,
    private fireChess: GameChessService) { }

  ngOnInit() {
    this.matGridSetup = this.appConfig.getGridConfig();
    this.listgames = this.appConfig.getGamesList();
    this.au.authState.subscribe(user => {
      if (user) {
        this.userlogined = user;
      } else {
        this.userlogined = null;
      }
    });
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
        this.fireChess.createGameQuickStart(this.userlogined)
          .then((docRef) => {
            dataParam = { action: 'quickStart', gameId: docRef.id };
            dialogRefNewQuickGame = this.dialog.open(ChessNewGameComponent, {
              data: dataParam
            });
            dialogRefNewQuickGame.afterClosed().subscribe(result => {
              if (!result) {
                this.translate.get('pagHome.AbortQuickGame').subscribe((res: string) => {
                  this.ShowToastMessage(res);
                  this.fireChess.deleteGameQuickStart(dataParam.gameId);
                });
              }
            });
          }
          ).catch(function(error) {
            this.ShowErrorMessage(error);
            console.error('Error adding document: ', error);
          });

        // dataParam = { action: 'quickStart', gameId: 'meSqA7bSd3S6w3K9f1J7' };
        // dialogRefNewQuickGame = this.dialog.open(ChessNewGameComponent, {
        //   data: dataParam
        // });

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

  // --  auxiliar 
  getMaxPlayers(n: number): any[] {
    return Array(n);
  }


}
