import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.css'
})
export class WorkExperienceComponent {
  datos$: Observable<WorkExperience[]>;
  errorCarga = '';
  constructor(servicio: WorkExperienceService) {
    this.datos$ = servicio.getWorkExperience().pipe(
      map(datos => datos.map(dato => Object.assign(new WorkExperience(), dato)).filter(dato => Object.values(dato).some(valor => typeof valor === 'string' && valor.trim().length > 0))),
      catchError(error => {
        console.error('No se pudo leer work-experience', error);
        this.errorCarga = 'No se pudo cargar esta sección. Revisa la conexión y los permisos de Firestore.';
        return of([] as WorkExperience[]);
      })
    );
  }
}
