import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
// --
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
// -- Model d.ts
import { GameChessService } from 'src/app/services/angularfire/game-chess.service';
import { ChessGame, MinInfoChessPlayer, chessColor, ChessMove, PiecesOutBoard } from '../model/chessgame';
import { gameState } from 'src/app/model/gamebase';
// -- lib java
declare var ChessBoard: any;
declare var Chess: any;
declare var $: any;

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
  player: MinInfoChessPlayer;
  currentGame: ChessGame;
  moveToSend: ChessMove;
  fenToSend = '#fen';
  stateGame: gameState = gameState.PLAYING;
  stateButtons = 'outside';
  statusMsg = '#status';
  board: any;
  game: any;
  whiteSquareGrey = '#a9a9a9';
  blackSquareGrey = '#696969';
  piecesOutBoard: any;

  constructor(private translate: TranslateService,
              private fireChess: GameChessService,
              private route: ActivatedRoute) { }


  // Region HostListener
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.board) { this.board.resize(event); }
  }
  // End Region HostListener


  ngOnInit() {
    this.idGame = this.route.snapshot.paramMap.get('id');
    console.log('this.idGame ' + this.idGame);
    this.player = {
      uid: this.route.snapshot.paramMap.get('user'),
      displayName: this.route.snapshot.paramMap.get('user'),
      color: chessColor.RAMDOM
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
      onMouseoutSquare: () => this.onMouseoutSquare(),
      onMouseoverSquare: (square, piece) => this.onMouseoverSquare(square, piece),
      onSnapEnd: () => this.onSnapEnd(this.board, this.game)
    };
    this.board = ChessBoard('myBoard', config);
    this.getPiecesOutBoard();
  }

  startTurn(snapshotgame: any) {
    this.currentGame = snapshotgame.payload.data() as ChessGame;
    console.log(' startTurn: actualizamos los datos', this.currentGame);
    if (this.player.color === chessColor.RAMDOM) {
      // -- this only append the first time
      this.player.color = this.currentGame.Players[this.player.uid].color;
      if (this.board) { this.board.orientation(this.player.color === 'w' ? 'white' : 'black'); }
    }

    if (this.board && this.game) {
      this.board.position(this.currentGame.position);
      if (this.game.validate_fen(this.currentGame.position).valid) {
        this.game.load(this.currentGame.position);
        if (this.game.in_checkmate()) {
          // this.status = 'Game over, is in checkmate.';
          this.onCheckmate();
        } else if (this.game.in_draw()) {
          // this.status = 'Game over, drawn position';
          this.onDraw();
        } else {
          if (this.game.in_check()) {
            // this.status += ' !!!!!  is in check';
            this.onCheck();
          } else {
            this.onTurn();
          }
        }
        this.getPiecesOutBoard();
      }
    }
  }
 // -- Boardchess function handlers
  onSnapEnd(board, game) {
    board.position(game.fen());
  }
  onDrop(game, source, target) {
    this.removeGreySquares();
    // see if the move is legal
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) {
      return 'snapback';
    } else {
      this.moveToSend = move;
      this.fenToSend = this.game.fen();
      this.stateButtons = 'inside';
    }
  }
  onDragStart(game, source, piece, position, orientation) {
    if (game.game_over()) { return false; }
    if (this.player.color !== game.turn()) { return false; }
  }
  onMouseoverSquare(square, piece) {
  // get list of possible moves for this square
  const moves = this.game.moves({
    square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) { return; }

  // highlight the square they moused over
  this.greySquare(square);

  // highlight the possible squares for this piece
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < moves.length; i++) {
    this.greySquare(moves[i].to);
  }
  }
  onMouseoutSquare() {
    this.removeGreySquares();
  }
  removeGreySquares() {
    $('#myBoard .square-55d63').css('background', '');
  }

  greySquare(square) {
    const $square = $('#myBoard .square-' + square);

    let background = this.whiteSquareGrey;
    if ($square.hasClass('black-3c85d')) {
      background = this.blackSquareGrey;
    }

    $square.css('background', background);
  }

  getPiecesOutBoard() {
    const rowsFen: string = this.game.fen().split(' ')[0];
    if (rowsFen) {
      const lengthFen = rowsFen.length;
      this.piecesOutBoard = {
        w: [
          {key: 'p', cant: (8 - (lengthFen - rowsFen.replace(/P/g, '').length)), imgPath: 'img/chesspieces/wikipedia/wP.png'},
          {key: 'n', cant: (2 - (lengthFen - rowsFen.replace(/N/g, '').length)), imgPath: 'img/chesspieces/wikipedia/wN.png' },
          {key: 'b', cant: (2 - (lengthFen - rowsFen.replace(/B/g, '').length)), imgPath: 'img/chesspieces/wikipedia/wB.png' },
          {key: 'r', cant: (2 - (lengthFen - rowsFen.replace(/R/g, '').length)), imgPath: 'img/chesspieces/wikipedia/wR.png' },
          {key: 'q', cant: (1 - (lengthFen - rowsFen.replace(/Q/g, '').length)), imgPath: 'img/chesspieces/wikipedia/wQ.png' }
        ],
        b: [
          {key: 'p', cant: (8 - (lengthFen - rowsFen.replace(/p/g, '').length)), imgPath: 'img/chesspieces/wikipedia/bP.png' },
          {key: 'n', cant: (2 - (lengthFen - rowsFen.replace(/n/g, '').length)), imgPath: 'img/chesspieces/wikipedia/bN.png' },
          {key: 'b', cant: (2 - (lengthFen - rowsFen.replace(/b/g, '').length)), imgPath: 'img/chesspieces/wikipedia/bB.png' },
          {key: 'r', cant: (2 - (lengthFen - rowsFen.replace(/r/g, '').length)), imgPath: 'img/chesspieces/wikipedia/bR.png' },
          {key: 'q', cant: (1 - (lengthFen - rowsFen.replace(/q/g, '').length)), imgPath: 'img/chesspieces/wikipedia/bQ.png' }
        ]
      };

      //   {
      //         p: 8 - (lengthFen - rowsFen.replace(/P/g, '').length),
      //         n: 2 - (lengthFen - rowsFen.replace(/N/g, '').length),
      //         b: 2 - (lengthFen - rowsFen.replace(/B/g, '').length),
      //         r: 2 - (lengthFen - rowsFen.replace(/R/g, '').length),
      //         q: 1 - (lengthFen - rowsFen.replace(/Q/g, '').length)
      //       },
      //   b:  {
      //         p: 8 - (lengthFen - rowsFen.replace(/p/g, '').length),
      //         n: 2 - (lengthFen - rowsFen.replace(/n/g, '').length),
      //         b: 2 - (lengthFen - rowsFen.replace(/b/g, '').length),
      //         r: 2 - (lengthFen - rowsFen.replace(/r/g, '').length),
      //         q: 1 - (lengthFen - rowsFen.replace(/q/g, '').length)
      //       }
      // };
    }

    // -- img/chesspieces/wikipedia/wK.png
    console.log('Las piezas en el tablero son ', rowsFen);
    console.log('Las piezas fuera del tablero son ', this.piecesOutBoard);
  }

  // -- Manager info Turn
  onCheckmate() {
    if (this.player.color === this.game.turn()) {
      alert('alpiste');
    } else {
      alert('ganaste');
    }
  }
  onDraw() {
    if (this.player.color === this.game.turn()) {
      alert('alpiste...  empatamos');
    }
  }
  onCheck() {
    if (this.player.color === this.game.turn()) {
      alert('MENSAJE IMPORTANTE');
    } else {
      alert('este no hay que mostrarlo');
    }
  }
  onTurn() {
    if (this.player.color === this.game.turn()) {
      this.translate.get('xxxx_Te toca jugar.').subscribe(
        (res: string) => {
          this.ShowToastMessage(res + this.player.color);
        });
    } else {
      this.translate.get('xxxx_Tienes que esperar.').subscribe(
        (res: string) => {
          this.ShowToastMessage(res + this.player.color);
        });
    }
  }

  // -- Botons
  public resetTurn() {
    if (this.board) {
      this.game.undo();
      this.board.position(this.currentGame.position);
    }
    this.stateButtons = 'outside';
  }

  public sendTurn() {
    this.fireChess.senTurn(this.idGame,
      this.moveToSend, this.fenToSend
    ).then(() => {
      console.log('xSe ha enviado el Turno');
      this.stateButtons = 'outside';
      this.stateGame = gameState.WAITING;
      this.ShowToastMessage('xSe ha enviado el Turno');
    })
      .catch((error) => {
        this.ShowErrorMessage('xError :-( ');
        console.log('Error adding document: ', error);
      });
  }

  // -- config show messages
  private ShowToastMessage(msg: string): void {
    Swal.fire({
      toast: true,
      position: 'bottom',
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

  // -- Unsubscribe
  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }
}
