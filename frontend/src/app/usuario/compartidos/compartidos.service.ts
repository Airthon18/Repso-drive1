import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArchivoCompartido } from './models/archivo-compartido.model';

@Injectable({
  providedIn: 'root'
})
export class CompartidosService {

  private archivosCompartidos: ArchivoCompartido[] = [
    {
      id: 1,
      nombre: 'Proyecto Wolke.docx',
      tamano: 24576,
      propietario: 'Rodrigo',
      fecha: new Date('2025-08-12'),
      permiso: 'ver',
      icono: 'assets/icons/docx.svg'
    },
    {
      id: 2,
      nombre: 'Diseño UX.zip',
      tamano: 543287,
      propietario: 'Hassad',
      fecha: new Date('2025-07-21'),
      permiso: 'editar',
      icono: 'assets/icons/zip.svg'
    },
    {
      id: 3,
      nombre: 'Logo Wolke.png',
      tamano: 108532,
      propietario: 'María',
      fecha: new Date('2025-06-05'),
      permiso: 'ver',
      icono: 'assets/icons/png.svg'
    }
  ];

  getCompartidos(): Observable<ArchivoCompartido[]> {
    return of(this.archivosCompartidos);
  }
}
