import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Recruitment, recruitmentState } from '../../model/recruitment';
import { MinInfoPlayer } from '../../model/player';
import { Chessgame } from '../../games/chess/model/chessgame';

@Injectable({
  providedIn: 'root'
})
export class GameChessService {

  constructor(private db: AngularFirestore) { }

  createGameQuickStart(r: Recruitment): Promise<void> {
    console.log('Vamos a crear un juego: description ', r.description);

    const batch = this.db.firestore.batch();

    const newGameRef = this.db.collection('Chess').doc(r.id).ref;
    const newGame: Chessgame = {
      gameType: r.gameType,
      name: r.name,
      turnCont: 1
    };

    batch.set(newGameRef, newGame);

    return batch.commit();
  }

  createGameFromThisRecruitment(r: Recruitment): Promise<void> {
    console.log('Vamos a crear un juego: description ', r.description);


    return Promise.resolve();

  }









}
