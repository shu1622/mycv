import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Education } from '../../models/education/education.model';

@Injectable({ providedIn: 'root' })
export class EducationService {
  constructor(private firestore: AngularFirestore) {}
  getEducation(): Observable<Education[]> {
    return this.firestore.collection<Education>('education').valueChanges();
  }
}
