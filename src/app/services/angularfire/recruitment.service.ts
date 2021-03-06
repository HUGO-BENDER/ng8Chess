import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { GlobaldataService } from '../angularfire/globaldata.service';
import { Recruitment, recruitmentState } from '../../model/recruitment';
import { MinInfoPlayer } from '../../model/player';
import { GameBase } from '../../model/gamebase';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  constructor(private db: AngularFirestore, private fireData: GlobaldataService) { }

  public createRecruitment(newRecruitment: Recruitment): Promise<DocumentReference> {
    return this.db.collection<Recruitment>('Recruitments').add(newRecruitment);
  }

  public getRecruitments() {
    return this.db.collection('Recruitments').snapshotChanges();
  }

  public deleteRecruitment(r: Recruitment): Promise<void> {
    return this.db.collection('Recruitments').doc(r.id).delete();
  }

  // joinRecruitment(r: Recruitment, userlogined: firebase.User): any {
  //   const rgRef = this.db.collection('Recruitments').doc(r.id).ref;
  //   r.players.push( <MinInfoPlayer> { uid: userlogined.uid, displayName: userlogined.displayName });
  //   return this.db.firestore.runTransaction(
  //     transJoinGame => transJoinGame.get(rgRef).then(
  //       sfDoc => {
  //         if (sfDoc.data().state === recruitmentState.OPEN) {
  //           const player1: MinInfoPlayer = { uid: userlogined.uid, displayName: userlogined.displayName };
  //           let arrayPlayers: Array<MinInfoPlayer> = [];
  //           arrayPlayers = sfDoc.data().players;
  //           arrayPlayers.push(player1);
  //           const newCount: number = sfDoc.data().countPlayers + 1;
  //           if (sfDoc.data().countPlayers + 1 === sfDoc.data().maxPlayers) {
  //             transJoinGame.update(rgRef, { state: recruitmentState.CLOSED, countPlayers: newCount, players: arrayPlayers });
  //           } else {
  //             transJoinGame.update(rgRef, { countPlayers: newCount, players: arrayPlayers });
  //           }
  //         } else {
  //           return Promise.reject('Sorry! Too late.');
  //         }
  //       }
  //     )
  //   );
  // }



  // createGameFromThisRecruitment(r: Recruitment): Promise<void> {
  //   console.log('Vamos a crear un juego: description ', r.description);

  //   const batch = this.db.firestore.batch();
  //   const NewId = this.fireData.createId();
  //   const newGameRef = this.db.collection('Games' + r.gameType).doc(NewId).ref;
  //   const newGame: GameBase = {
  //     gameType: r.gameType,
  //     name: r.name,
  //     turnCont: 1
  //   };

  //   batch.set(newGameRef, newGame);

  //   r.players.forEach(p => {
  //     if (!p.uid.startsWith('anonymousPlayer')) {
  //       const newGamePlayerRef = this.db.collection('Games').doc(NewId).collection('Players').doc(p.uid).ref;
  //       batch.set(newGamePlayerRef, { uid: p.uid, displayName: p.displayName });
  //     }
  //   });

  //   if (r.id) {
  //     const rgRef = this.db.collection('Recruitments').doc(r.id).ref;
  //     batch.delete(rgRef);
  //   }
  //   return batch.commit();
  // }


}
