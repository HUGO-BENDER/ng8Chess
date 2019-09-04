import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// -- Model d.ts
import { MinInfoPlayer } from 'src/app/model/player';
// import { GameChessService } from 'src/app/services/angularfire/game-chess.service';
// import { ChessGame } from '../model/chessgame';

@Component({
  selector: 'app-chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css'],
  animations: [
    trigger('animAppear', [
      state('outside', style({
        position: 'absolute',
        transform: 'translateX(-100%)',
      })),
      state('inside', style({
        position: 'relative',
        transform: 'translateX(0)',
      })),
      transition('outside <=> inside', animate('300ms')),
    ])
  ]
})
export class ChessComponent implements OnInit, OnDestroy  {

  idGame: string;
  // gameSubscription: Subscription;
   player: MinInfoPlayer;
  // currentGame: ChessGame;



  constructor( private translate: TranslateService,
              //  private fireChess: GameChessService,
               private route: ActivatedRoute ) {

                console.log('entramos a constructor');
               }

  ngOnInit() {


    console.log('entramos a ngOnInit');
    this.idGame = this.route.snapshot.paramMap.get('id');
    
    console.log('route ' + this.route);
    
    console.log('route ' + this.route.parent);
    this.player = {
      uid: this.route.snapshot.paramMap.get('user'),
      displayName: this.route.snapshot.paramMap.get('user')
    };

    // this.gameSubscription = this.fireChess.getSnapshotGame(this.idGame).subscribe(snapshotgame => {
    //   this.startTurn(snapshotgame);
    // });





  }
  startTurn(snapshotgame: any) {

    // this.currentGame =  snapshotgame.payload.data() as ChessGame;
    // console.log(' startTurn: actualizamos los datos', this.currentGame);
  }

  ngOnDestroy(): void {
    // this.gameSubscription.unsubscribe();
  }
}
