import { Component, OnInit } from '@angular/core';


import Swal from 'sweetalert2';

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

  constructor() { }

  ngOnInit() {
  }

}
