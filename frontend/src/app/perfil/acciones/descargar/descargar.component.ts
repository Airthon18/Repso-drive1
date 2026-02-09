import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

type Step = 'preparando' | 'comprimiendo' | 'listo';

@Component({
  selector: 'app-descargar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css'],
})
export class DescargarComponent implements OnChanges {
  /** abrir/cerrar */
  @Input() open = false;

  /** cantidad de elementos seleccionados (para el texto) */
  @Input() count = 0;

  /** cerrar modal */
  @Output() close = new EventEmitter<void>();

  step: Step = 'preparando';
  private t1?: any;
  private t2?: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      // reinicia el flujo cuando se abre
      this.step = 'preparando';
      clearTimeout(this.t1);
      clearTimeout(this.t2);

      this.t1 = setTimeout(() => (this.step = 'comprimiendo'), 1200);
      this.t2 = setTimeout(() => (this.step = 'listo'), 2600);
    }
    if (changes['open'] && !this.open) {
      clearTimeout(this.t1);
      clearTimeout(this.t2);
    }
  }

  doClose(): void {
    this.close.emit();
  }
}
