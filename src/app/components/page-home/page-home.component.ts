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
  matGridSetup: AppGridConfig;
  
  constructor(
    public breakpointObserver: BreakpointObserver,
    public appConfig: AppConfig) { }

  ngOnInit() {
    this.matGridSetup = this.appConfig.getGridConfig();
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
      .observe(['(max-width: 1200px)'])
      .subscribe((state: BreakpointState) => {
        this.inLargeScreen = state.matches;
        this.makeResponsive();
      });
  }

  makeResponsive(): void {
    if (this.inSmallScreen) {
      this.matGridSetup.cols = 1;
      this.matGridSetup.JoinOrCreateGame.colsSpan = 1;
      this.matGridSetup.GamesInProgress.colsSpan = 1;
      // this.matGridSetup.JoinOrCreateGame.CreateGameSubGrid.cols = 1;
      console.log('inSmallScreen');
    } else if (this.inMediumScreen) {
      this.matGridSetup.cols = 2;
      this.matGridSetup.JoinOrCreateGame.colsSpan = 1;
      this.matGridSetup.GamesInProgress.colsSpan = 1;
      // this.matGridSetup.JoinOrCreateGame.CreateGameSubGrid.cols = 1;
      console.log('inMediumScreen');
    } else if (this.inLargeScreen) {
      this.matGridSetup.cols = 2;
      this.matGridSetup.JoinOrCreateGame.colsSpan = 1;
      this.matGridSetup.GamesInProgress.colsSpan = 1;
      // this.matGridSetup.JoinOrCreateGame.CreateGameSubGrid.cols = 1;
      console.log('inLargeScreen');
    } else {
      this.matGridSetup.cols = 3;
      this.matGridSetup.JoinOrCreateGame.colsSpan = 2;
      this.matGridSetup.GamesInProgress.colsSpan = 1;
      // this.matGridSetup.JoinOrCreateGame.CreateGameSubGrid.cols = 3;
      console.log('muy grande');
    }
  }


}
