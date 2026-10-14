import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  datos$: Observable<Skills[]>;
  errorCarga = '';
  constructor(servicio: SkillsService) {
    this.datos$ = servicio.getSkills().pipe(
      map(datos => datos.map(dato => Object.assign(new Skills(), dato)).filter(dato => Object.values(dato).some(valor => typeof valor === 'string' && valor.trim().length > 0))),
      catchError(error => {
        console.error('No se pudo leer skills', error);
        this.errorCarga = 'No se pudo cargar esta sección. Revisa la conexión y los permisos de Firestore.';
        return of([] as Skills[]);
      })
    );
  }
}
