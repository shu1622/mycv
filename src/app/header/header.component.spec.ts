import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from './header.component';
import { HeaderService } from '../services/header-service/header.service';

describe('HeaderComponent', () => {
  async function preparar(falla = false) {
    await TestBed.configureTestingModule({
      imports: [CommonModule], declarations: [HeaderComponent],
      providers: [{ provide: HeaderService, useValue: { getHeader: () => falla ? throwError(() => new Error('sin permisos')) : of([{ Nombre: 'Dato visible' }]) } }]
    }).compileComponents();
    const fixture = TestBed.createComponent(HeaderComponent);
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
