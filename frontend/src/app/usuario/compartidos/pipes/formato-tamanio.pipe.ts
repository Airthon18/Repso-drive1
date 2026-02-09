import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoTamanio',
  standalone: true
})
export class FormatoTamanioPipe implements PipeTransform {
  transform(bytes: number): string {
    if (isNaN(bytes) || bytes < 0) return '0 B';
    const unidades = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${unidades[i]}`;
  }
}
