import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { CertificatesService } from './certificates.service';

describe('CertificatesService', () => {
  it('lee la colección raíz certificates', () => {
    const registros = [{ name: 'Dato de prueba' }];
    const firestore = { collection: jasmine.createSpy('collection').and.returnValue({ valueChanges: () => of(registros) }) };
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    TestBed.inject(CertificatesService).getCertificates().subscribe(datos => expect(datos).toEqual(registros as any));
    expect(firestore.collection).toHaveBeenCalledWith('certificates');
  });
});
