import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chess-info',
  templateUrl: './chess-info.component.html',
  styleUrls: ['./chess-info.component.css']
})
export class ChessInfoComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

}
