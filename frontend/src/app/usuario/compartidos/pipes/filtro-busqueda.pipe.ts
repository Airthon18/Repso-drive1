import { Pipe, PipeTransform } from '@angular/core';
import { ArchivoCompartido } from '../models/archivo-compartido.model';

@Pipe({
  name: 'filtroBusqueda',
  standalone: true
})
export class FiltroBusquedaPipe implements PipeTransform {
  transform(archivos: ArchivoCompartido[], termino: string): ArchivoCompartido[] {
    if (!termino) return archivos;
    const term = termino.toLowerCase();
    return archivos.filter(a =>
      a.nombre.toLowerCase().includes(term) ||
      a.propietario.toLowerCase().includes(term)
    );
  }
}
