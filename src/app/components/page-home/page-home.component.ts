import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';


// import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

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
              public au: AngularFireAuth) { }

  ngOnInit() {
    this.au.authState.subscribe(user => {
      if (user) {
        this.userlogined = user;
        // this.gamesInProgress = this.afsPlayer.getGamesInProgress(user).map(
        //   actions => {
        //     return actions.map(action => {
        //       const data = action.payload.doc.data() as GameInProgress;
        //       const id = action.payload.doc.id;
        //       return { id, ...data };
        //     });
        //   }
        // );
      } else {
        this.userlogined = null;
        // this.gamesInProgress = null;
      }
    });




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

  joinOrCreateRecruitment(idGame: string) {

    console.log('joinOrCreateRecruitment ' + idGame);
    if (this.userlogined) {
      switch (idGame) {
        case 'chess':
          // this.RecruitForChinker();
        alert('new chesss');
        break;

        default:
          break;
      }
    } else {
      // this.ShowErrorMessage('xNo se puede ejecutar esta acción sin estar loginado');
    }
  }






}
