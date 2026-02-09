import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MoveOption {
  id: string;
  name: string;
  disabled?: boolean; // ej: no permitir moverse dentro de sí mismo
}

@Component({
  selector: 'app-mover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mover.component.html',
  styleUrls: ['./mover.component.css'],
})
export class MoverComponent {
  /** Controla apertura */
  @Input() open = false;

  /** Opciones de carpeta destino */
  @Input() options: MoveOption[] = [];

  /** Cantidad seleccionada (para el texto) */
  @Input() count = 0;

  /** Id preseleccionado opcional */
  @Input() defaultDestId = '';

  /** Eventos al padre */
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ destinationId: string }>();

  /** Estado local: destino elegido */
  destId = '';

  ngOnChanges(): void {
    // sincroniza al abrir
    if (this.open) {
      this.destId = this.defaultDestId || '';
    }
  }

  pick(id: string) { this.destId = id; }
  doCancel() { this.cancel.emit(); }
  doConfirm() {
    if (!this.destId) return;
    this.confirm.emit({ destinationId: this.destId });
  }

  get isValid(): boolean {
    return !!this.destId && !this.options.find(o => o.id === this.destId)?.disabled;
  }
}
