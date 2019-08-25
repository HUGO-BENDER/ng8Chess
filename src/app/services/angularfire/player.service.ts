import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private db: AngularFirestore) {}

  public getGamesInProgress(userlogined: firebase.User) {
    return this.db.collection('Players').doc(userlogined.uid).collection('Playing').snapshotChanges();
  }

}
