import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.css'
})
export class InterestsComponent {
  datos$: Observable<Interests[]>;
  errorCarga = '';
  constructor(servicio: InterestsService) {
    this.datos$ = servicio.getInterests().pipe(
      map(datos => datos.map(dato => Object.assign(new Interests(), dato)).filter(dato => Object.values(dato).some(valor => typeof valor === 'string' && valor.trim().length > 0))),
      catchError(error => {
        console.error('No se pudo leer interests', error);
        this.errorCarga = 'No se pudo cargar esta sección. Revisa la conexión y los permisos de Firestore.';
        return of([] as Interests[]);
      })
    );
  }
}
