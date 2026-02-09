import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-renombrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './renombrar.component.html',
  styleUrls: ['./renombrar.component.css'],
})
export class RenombrarComponent implements OnChanges {
  /** Abre/cierra el modal desde el padre */
  @Input() open = false;

  /** Nombre actual del elemento seleccionado */
  @Input() currentName = '';

  /** Cerrar sin cambios */
  @Output() cancel = new EventEmitter<void>();

  /** Confirmar con el nuevo nombre */
  @Output() confirm = new EventEmitter<string>();

  /** Valor del input en el modal */
  renameValue = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] || changes['currentName']) {
      // Sincroniza el valor del input cuando se abre o cambia el target
      if (this.open) {
        this.renameValue = this.currentName ?? '';
        // pequeño truco para que el autofocus funcione al abrir
        setTimeout(() => {
          const el = document.getElementById('renameInput');
          (el as HTMLInputElement | null)?.focus();
        }, 0);
      }
    }
  }

  doCancel(): void {
    this.cancel.emit();
  }

  doConfirm(): void {
    const name = (this.renameValue ?? '').trim();
    if (!name || name === this.currentName) {
      this.cancel.emit();
      return;
    }
    this.confirm.emit(name);
  }

  // Cierra con ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.doCancel();
  }
}
