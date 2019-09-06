import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
// --
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
// -- Model d.ts
import { MinInfoPlayer } from 'src/app/model/player';
import { GameChessService } from 'src/app/services/angularfire/game-chess.service';
import { ChessGame } from '../model/chessgame';
import { gameState } from 'src/app/model/gamebase';
// -- lib java
declare var ChessBoard: any;
declare var Chess: any;


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
export class ChessComponent implements OnInit, OnDestroy {

  idGame: string;
  gameSubscription: Subscription;
  player: MinInfoPlayer;
  currentGame: ChessGame;
  stateGame: gameState = gameState.WAITING;
  stateButtons = 'outside';
  status = '#status';
  fen = '#fen';
  pgn = '#pgn';
  board: any;
  game: any;

  //   private _position:      any     = 'start';
  //   private _orientation:   Boolean = true;
  //   private _showNotation:  Boolean = true;
  //   private _draggable:     Boolean = false;
  //   private _dropOffBoard:  string  = 'snapback';
  //   private _pieceTheme:    any     = 'img/chesspieces/wikipedia/{piece}.png';
  //   private _moveSpeed:     any     = 200;
  //   private _snapbackSpeed: any     = 500;
  //   private _snapSpeed:     any     = 100;
  //   private _sparePieces:   Boolean = false;




  constructor(private translate: TranslateService,
    private fireChess: GameChessService,
    private route: ActivatedRoute) { }


  // Region HostListener
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.board) this.board.resize(event);
  }
  // End Region HostListener


  ngOnInit() {
    this.idGame = this.route.snapshot.paramMap.get('id');
    console.log('this.idGame ' + this.idGame);
    this.player = {
      uid: this.route.snapshot.paramMap.get('user'),
      displayName: this.route.snapshot.paramMap.get('user')
    };
    console.log('this.player ', this.player.uid, ' ', this.player.displayName);

    this.loadChess();
    this.gameSubscription = this.fireChess.getSnapshotGame(this.idGame).subscribe(snapshotgame => {
      this.startTurn(snapshotgame);
    });

  }

  loadChess(): void {
    this.game = new Chess();
    const config = {
      draggable: true,
      position: 'start',
      onDragStart: (source, piece, position, orientation) => this.onDragStart(this.game, source, piece, position, orientation),
      onDrop: (source, target) => this.onDrop(this.game, source, target),
      onSnapEnd: () => this.onSnapEnd(this.board, this.game)
    };
    this.board = ChessBoard('myBoard', config);
    this.updateStatus();
  }


  startTurn(snapshotgame: any) {

    this.currentGame = snapshotgame.payload.data() as ChessGame;
    console.log(' startTurn: actualizamos los datos', this.currentGame);

    this.stateGame = this.currentGame.uidPlaying === this.player.uid ? 0 : 1;
    if (this.stateGame === gameState.PLAYING) {
      this.translate.get('xxxx_Te toca jugar.').subscribe(
        (res: string) => {
          this.ShowToastMessage(res);
        });
    } else {

      this.translate.get('xxxx_Tienes que esperar.').subscribe(
        (res: string) => {
          this.ShowToastMessage(res);
        });


    }

  }

  onSnapEnd(board, game) {
    board.position(game.fen());
  }

  onDrop(game, source, target) {
    // see if the move is legal
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) 
      { return 'snapback'; }
    else {
      console.log('Guardar movimiento ', source, target)
    }  

    this.updateStatus();
  }

  onDragStart(game, source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) { return false; }

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  }

  updateStatus() {
    this.status = '';

    let moveColor = 'White';
    if (this.game.turn() === 'b') {
      moveColor = 'Black';
    }

    // checkmate?
    if (this.game.in_checkmate()) {
      this.status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (this.game.in_draw()) {
      this.status = 'Game over, drawn position';
    } else {
      this.status = moveColor + ' to move';

      // check?
      if (this.game.in_check()) {
        this.status += ', ' + moveColor + ' is in check';
      }
    }

    this.fen = this.game.fen();
    this.pgn = this.game.pgn();


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
  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }
}
