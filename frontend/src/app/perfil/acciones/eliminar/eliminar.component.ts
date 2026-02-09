import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css'],
})
export class EliminarComponent {
  /** Abre/cierra el modal */
  @Input() open = false;

  /** Nombre del primer elemento (para mensajes cuando hay 1) */
  @Input() primaryName = '';

  /** Cantidad total seleccionada */
  @Input() count = 0;

  /** Eventos al padre */
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  /** Texto mostrado en el cuerpo del modal */
  get titleText(): string {
    if (this.count <= 1) {
      const name = this.primaryName || 'este elemento';
      return `¿Eliminar “${name}”? Esta acción no se puede deshacer.`;
    }
    return `¿Eliminar ${this.count} elementos? Esta acción no se puede deshacer.`;
  }

  doCancel() { this.cancel.emit(); }
  doConfirm() { this.confirm.emit(); }
}
