import { Component, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';


// import Swal from 'sweetalert2';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  matGridSetup = {
    cols: 3,
    rowHeight: '350px',
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
      id: "chess",
      title: "Chess",
      subtitle: "Clasic chess",
      image48Path: "../../../assets/games/chess/chess_48.png"
    },
    {
      id: "crazychess",
      title: "Crazy chess",
      subtitle: "Change the rules!!!",
      image48Path: "../../../assets/games/crazychess/crazychess_48.png"
    },
    {
      id: "chinker",
      title: "Chinker",
      subtitle: "Chin-(Chon + Po)-ker",
      image48Path: "../../../assets/games/chinker/chinker_48.png"
    },
    {
      id: "flow",
      title: "Flow",
      subtitle: "Flow original from Phaser",
      image48Path: "../../../assets/games/chinker/chinker_48.png"
    }
  ]



  constructor() { }

  ngOnInit() {
  }

}
