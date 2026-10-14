import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({ providedIn: 'root' })
export class CertificatesService {
  constructor(private firestore: AngularFirestore) {}
  getCertificates(): Observable<Certificates[]> {
    return this.firestore.collection<Certificates>('certificates').valueChanges();
  }
}
