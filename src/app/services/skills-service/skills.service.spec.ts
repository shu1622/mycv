import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  it('lee la colección raíz skills', () => {
    const registros = [{ name: 'Dato de prueba' }];
    const firestore = { collection: jasmine.createSpy('collection').and.returnValue({ valueChanges: () => of(registros) }) };
    TestBed.configureTestingModule({ providers: [{ provide: AngularFirestore, useValue: firestore }] });
    TestBed.inject(SkillsService).getSkills().subscribe(datos => expect(datos).toEqual(registros as any));
    expect(firestore.collection).toHaveBeenCalledWith('skills');
  });
});
