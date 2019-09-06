import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Recruitment } from '../../model/recruitment';
import { ChessGame, MinInfoChessPlayer, chessColor } from '../../games/chess/model/chessgame';

import { GlobaldataService } from '../angularfire/globaldata.service';
import * as firebaseApp from 'firebase';
import { gameState, ColPlayers } from 'src/app/model/gamebase';


@Injectable({
  providedIn: 'root'
})
export class GameChessService {


  constructor(private db: AngularFirestore, private fireData: GlobaldataService) { }


  createGameQuickStart(userlogined: firebase.User): Promise<DocumentReference> {
    console.log('Vamos a crear un juego: description ');
    // -- create game
    let IsRandomColorWhite = Math.random()<.5;
    let player1: MinInfoChessPlayer = { 
      uid: 'anonymousPlayer1', 
      displayName: 'Player1', 
      color: IsRandomColorWhite? chessColor.WHITE: chessColor.BLACK
    };
    // if (userlogined) {
    //   player1 = { uid: userlogined.uid, displayName: userlogined.displayName };
    // }
    const player2: MinInfoChessPlayer = { 
      uid: 'anonymousPlayer2', 
      displayName: 'Player2',
      color: IsRandomColorWhite? chessColor.BLACK: chessColor.WHITE 
    };
    const arrayPlayers: ColPlayers = {};
    arrayPlayers[player1.uid] = player1;
    arrayPlayers[player2.uid] = player2;
    const newQuickClassicChess: ChessGame = {
      gameType: 'quickClassicChess',
      name: 'quickClassicChess',
      dateCreation: firebaseApp.firestore.FieldValue.serverTimestamp(),
      Players: arrayPlayers,
      turnCont: 0,
      state: gameState.WAITING,
      gameTurn: 'b'
    };

    return this.db.collection('Games.ClassicChess').add(newQuickClassicChess);
  }


  createGameFromThisRecruitment(r: Recruitment): Promise<void> {
    console.log('Vamos a crear un juego: description ', r.description);
    return Promise.resolve();
  }

  getSnapshotGame(idGame: string) {
    return this.db.collection('Games.ClassicChess').doc(idGame).snapshotChanges();
 }







}
