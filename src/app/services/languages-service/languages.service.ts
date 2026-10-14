import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Languages } from '../../models/languages/languages.model';

@Injectable({ providedIn: 'root' })
export class LanguagesService {
  constructor(private firestore: AngularFirestore) {}
  getLanguages(): Observable<Languages[]> {
    return this.firestore.collection<Languages>('languages').valueChanges();
  }
}
