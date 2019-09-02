import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class GlobaldataService {

  constructor(private db: AngularFirestore) { }

  createId() {
    return this.db.createId();
  }



}
