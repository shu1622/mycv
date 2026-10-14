import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Header } from '../../models/header/header.model';

@Injectable({ providedIn: 'root' })
export class HeaderService {
  constructor(private firestore: AngularFirestore) {}
  getHeader(): Observable<Header[]> {
    return this.firestore.collection<Header>('header').valueChanges();
  }
}
