import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase/app';
// import { AngularFirestore, AngFirularestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RecruitmentService } from 'src/app/services/angularfire/Recruitment.service';
import { PlayerService } from 'src/app/services/angularfire/player.service';
import { Recruitment, recruitmentState } from 'src/app/model/recruitment';
import { MinInfoPlayer } from 'src/app/model/player';
import { GameInProgress } from 'src/app/model/gamebase';

import Swal from 'sweetalert2';

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
      case 'chinker':
        // const dialogRef = this.dialog.open(ChinkerDialogManualComponent);
        break;

      default:
        break;
    }

  }

  quickStart(idGame: string) {
    const gameInProgress: GameInProgress = this.getRecentGameInProgress(idGame);
    if (gameInProgress) {
      this.openGame(gameInProgress);
    } else {
      const recruitment: Recruitment = this.getRecentRecruitment(idGame);
      if (recruitment) {
        this.joinRecruitmentAndStartGame(recruitment);
      } else {
        this.createRecruitment(idGame);
      }
    }
  }

  getRecentGameInProgress(idGame: string): GameInProgress {
    // let recentGameInProgress: GameInProgress = null;
    // // this.gamesInProgress.forEach()
    // return recentGameInProgress;

    return null;
  }
  getRecentRecruitment(idGame: string): Recruitment {
    return null;
  }

  joinRecruitmentAndStartGame(recruitment: Recruitment) {
    throw new Error('Method not implemented.');
  }

  createRecruitment(idGame: string) {
    // let dialogRef: MatDialog;
    // switch (idGame) {
    //   case 'chinker':
    //     dialogRef = this.dialog.open(ChinkerDialogManualComponent);
    //     break;

    //   default:
    //     break;
    // }




    const player1: MinInfoPlayer = { uid: this.userlogined.uid, displayName: this.userlogined.displayName };
    const arrayPlayers: Array<MinInfoPlayer> = [];
    arrayPlayers.push(player1);
    const newRecruitment: Recruitment = {
      gameType: idGame,
      name: 'setup.name',
      description: 'setup.description',
      dateCreation: null,
      state: recruitmentState.OPEN,
      creator: player1,
      players: arrayPlayers,
      countPlayers: 1,
      maxPlayers: 2,
      config: {}
    };
    this.fireRecruitment.createRecruitment(newRecruitment)
      .then((docRef) => {
        Swal.fire({
          position: 'top',
          type: 'success',
          title: this.translate.instant('xxxHas creado un juego'),
          text: 'setup.name' + ' ' + 'setup.description',
          showConfirmButton: false,
          timer: 2000
        });
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        this.ShowErrorMessage(error);
        console.error('Error adding document: ', error);
      });
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
    // this.fireRecruitments.deleteRecruitment(r)
    //   .then(function () {
    //     this.ShowToastMessage('xGame delete.');
    //   })
    //   .catch(function (error) {
    //     this.ShowErrorMessage('xError deleting game.');
    //   });
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
    //   this.ShowErrorMessage('xNo se puede ejecutar esta acción sin estar loginado');
    // }
  }

}
