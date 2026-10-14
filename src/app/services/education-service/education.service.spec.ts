import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { EducationService } from './education.service';

describe('EducationService', () => {
  it('lee la colección raíz education', () => {
    const registros = [{ institution: 'Dato de prueba' }];
    const firestore = { collection: jasmine.createSpy('collection').and.returnValue({ valueChanges: () => of(registros) }) };
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    TestBed.inject(EducationService).getEducation().subscribe(datos => expect(datos).toEqual(registros as any));
    expect(firestore.collection).toHaveBeenCalledWith('education');
  });
});
