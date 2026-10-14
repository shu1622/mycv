import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { WorkExperienceComponent } from './work-experience.component';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';

describe('WorkExperienceComponent', () => {
  async function preparar(falla = false) {
    await TestBed.configureTestingModule({
      imports: [CommonModule], declarations: [WorkExperienceComponent],
      providers: [{ provide: WorkExperienceService, useValue: { getWorkExperience: () => falla ? throwError(() => new Error('sin permisos')) : of([{ position: 'Dato visible' }]) } }]
    }).compileComponents();
    const fixture = TestBed.createComponent(WorkExperienceComponent);
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
