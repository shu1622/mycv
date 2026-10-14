import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { LanguagesComponent } from './languages.component';
import { LanguagesService } from '../services/languages-service/languages.service';

describe('LanguagesComponent', () => {
  async function preparar(falla = false) {
    await TestBed.configureTestingModule({
      imports: [CommonModule], declarations: [LanguagesComponent],
      providers: [{ provide: LanguagesService, useValue: { getLanguages: () => falla ? throwError(() => new Error('sin permisos')) : of([{ name: 'Dato visible' }]) } }]
    }).compileComponents();
    const fixture = TestBed.createComponent(LanguagesComponent);
    fixture.detectChanges(); return fixture;
  }
  it('muestra el dato recibido del servicio', async () => {
    const fixture = await preparar();
    expect(fixture.nativeElement.textContent).toContain('Dato visible');
  });
  it('muestra un error y termina el estado de carga', async () => {
    spyOn(console, 'error');
    const fixture = await preparar(true);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeTruthy();
    expect(fixture.nativeElement.textContent).not.toContain('Cargando...');
  });
});
