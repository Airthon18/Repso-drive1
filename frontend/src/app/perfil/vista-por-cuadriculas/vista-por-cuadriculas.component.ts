import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GridTipo = 'carpeta' | 'archivo';

export interface GridItem {
  titulo: string;
  tipo: GridTipo;
  fecha?: string;
}

@Component({
  selector: 'app-vista-por-cuadriculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vista-por-cuadriculas.component.html',
  styleUrls: ['./vista-por-cuadriculas.component.css']
})
export class VistaPorCuadriculasComponent {
  /** Lista que recibes desde el padre (PerfilComponent) */
  @Input() items: GridItem[] = [];

  /** Evento que emite el ítem clicado/activado con el teclado */
  @Output() itemClick = new EventEmitter<GridItem>();

  /** Click con el mouse / tap */
  onItemClick(it: GridItem) {
    this.itemClick.emit(it);
  }

  /** Accesibilidad: activar con Enter o Space */
  onItemKeydown(ev: KeyboardEvent, it: GridItem) {
    const key = ev.key.toLowerCase();
    if (key === 'enter' || key === ' ') {
      ev.preventDefault();
      this.itemClick.emit(it);
    }
  }
}
