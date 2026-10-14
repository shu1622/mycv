import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Skills } from '../../models/skills/skills.model';

@Injectable({ providedIn: 'root' })
export class SkillsService {
  constructor(private firestore: AngularFirestore) {}
  getSkills(): Observable<Skills[]> {
    return this.firestore.collection<Skills>('skills').valueChanges();
  }
}
