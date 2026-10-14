import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  datos$: Observable<Header[]>;
  errorCarga = '';
  constructor(servicio: HeaderService) {
    this.datos$ = servicio.getHeader().pipe(
      map(datos => datos.map(dato => Object.assign(new Header(), dato)).filter(dato => Object.values(dato).some(valor => typeof valor === 'string' && valor.trim().length > 0))),
      catchError(error => {
        console.error('No se pudo leer header', error);
        this.errorCarga = 'No se pudo cargar esta sección. Revisa la conexión y los permisos de Firestore.';
        return of([] as Header[]);
      })
    );
  }
}
