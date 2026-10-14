import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {
  datos$: Observable<Languages[]>;
  errorCarga = '';
  constructor(servicio: LanguagesService) {
    this.datos$ = servicio.getLanguages().pipe(
      map(datos => datos.map(dato => Object.assign(new Languages(), dato)).filter(dato => Object.values(dato).some(valor => typeof valor === 'string' && valor.trim().length > 0))),
      catchError(error => {
        console.error('No se pudo leer languages', error);
        this.errorCarga = 'No se pudo cargar esta sección. Revisa la conexión y los permisos de Firestore.';
        return of([] as Languages[]);
      })
    );
  }
}
