import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type ShareRole = 'lector' | 'comentador' | 'editor';

@Component({
  selector: 'app-compartir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './compartir.component.html',
  styleUrls: ['./compartir.component.css'],
})
export class CompartirComponent implements OnChanges {
  /** Control externo de apertura */
  @Input() open = false;

  /** Nombre del recurso (para el título) */
  @Input() targetName = '';

  /** Valores por defecto (opcionales) */
  @Input() defaultEmail = '';
  @Input() defaultMessage = '';
  @Input() defaultRole: ShareRole = 'editor';

  /** Eventos al padre */
  @Output() cancel = new EventEmitter<void>();
  @Output() send = new EventEmitter<{ email: string; message: string; role: ShareRole }>();

  /** Estado interno del formulario */
  email = '';
  message = '';
  role: ShareRole = 'editor';
  roleMenuOpen = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      // sincroniza al abrir
      this.email = this.defaultEmail ?? '';
      this.message = this.defaultMessage ?? '';
      this.role = this.defaultRole ?? 'editor';
      setTimeout(() => document.getElementById('shareEmail')?.focus(), 0);
    }
  }

  get isEmailValid(): boolean {
    const e = this.email.trim();
    if (!e) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  }

  get roleLabel(): string {
    return this.role === 'editor' ? 'Editor' : this.role === 'comentador' ? 'Comentador' : 'Lector';
  }

  toggleRoleMenu(): void {
    this.roleMenuOpen = !this.roleMenuOpen;
  }

  chooseRole(r: ShareRole): void {
    this.role = r;
    this.roleMenuOpen = false;
  }

  doCancel(): void {
    this.cancel.emit();
  }

  doSend(): void {
    if (!this.isEmailValid) return;
    this.send.emit({
      email: this.email.trim(),
      message: this.message.trim(),
      role: this.role,
    });
  }

  // Cerrar menú de rol con clic fuera
  @HostListener('document:click')
  onDocClick() { if (this.roleMenuOpen) this.roleMenuOpen = false; }

  // Cerrar modal con ESC
  @HostListener('document:keydown.escape')
  onEsc() { if (this.open) this.doCancel(); }
}
