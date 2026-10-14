import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Interests } from '../../models/interests/interests.model';

@Injectable({ providedIn: 'root' })
export class InterestsService {
  constructor(private firestore: AngularFirestore) {}
  getInterests(): Observable<Interests[]> {
    return this.firestore.collection<Interests>('interests').valueChanges();
  }
}
