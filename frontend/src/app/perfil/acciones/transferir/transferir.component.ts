import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Provider = 'drive' | 'dropbox' | 'onedrive' | 'url';

interface RemoteFile {
  id: string;
  name: string;
  size: string;
  modified: string;
}

@Component({
  selector: 'app-transferir',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css'],
})
export class TransferirComponent implements OnChanges {
  /** Abre/cierra el modal */
  @Input() open = false;

  /** Eventos al padre */
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{
    provider: Provider;
    files?: RemoteFile[];
    url?: string;
  }>();

  // Estado
  provider: Provider = 'drive';
  files: RemoteFile[] = [];
  selected = new Set<string>();

  // Para “URL directa”
  linkUrl = '';

  // Loading simulado al cambiar proveedor
  loading = false;

  ngOnChanges(ch: SimpleChanges): void {
    if (ch['open'] && this.open) {
      this.resetState();
      this.loadFilesFor(this.provider);
    }
  }

  private resetState() {
    this.selected.clear();
    this.linkUrl = '';
    // no resetear provider para que recuerde la última pestaña
  }

  // Cargar lista simulada según proveedor
  loadFilesFor(p: Provider) {
    if (p === 'url') return;
    this.loading = true;
    this.files = [];
    setTimeout(() => {
      const base =
        p === 'drive' ? 'Drive' : p === 'dropbox' ? 'Dropbox' : 'OneDrive';
      this.files = [
        { id: '1', name: `${base} - Reporte trimestral.pdf`, size: '2.4 MB', modified: '2025-08-08' },
        { id: '2', name: `${base} - Fotos viaje.zip`,       size: '120 MB',  modified: '2025-07-21' },
        { id: '3', name: `${base} - Presentación.pptx`,     size: '8.7 MB',  modified: '2025-06-30' },
        { id: '4', name: `${base} - Notas.md`,              size: '15 KB',   modified: '2025-06-15' },
      ];
      this.loading = false;
    }, 600);
  }

  changeProvider(p: Provider) {
    this.provider = p;
    this.resetState();
    this.loadFilesFor(p);
  }

  // Selección
  isChecked(id: string) { return this.selected.has(id); }
  toggle(id: string, checked: boolean) {
    if (checked) this.selected.add(id);
    else this.selected.delete(id);
  }
  toggleAll(checked: boolean) {
    this.selected.clear();
    if (checked) this.files.forEach(f => this.selected.add(f.id));
  }
  get allChecked(): boolean {
    return this.files.length > 0 && this.selected.size === this.files.length;
  }

  // Validación
  get isValid(): boolean {
    if (this.provider === 'url') {
      const u = this.linkUrl.trim();
      if (!u) return false;
      try {
        const parsed = new URL(u);
        return !!parsed.protocol && !!parsed.host;
      } catch { return false; }
    }
    return this.selected.size > 0;
  }

  // Acciones
  doCancel() { this.cancel.emit(); }

  doConfirm() {
    if (!this.isValid) return;
    if (this.provider === 'url') {
      this.confirm.emit({ provider: 'url', url: this.linkUrl.trim() });
    } else {
      const picked = this.files.filter(f => this.selected.has(f.id));
      this.confirm.emit({ provider: this.provider, files: picked });
    }
  }

  // ESC para cerrar
  @HostListener('document:keydown.escape')
  onEsc() { if (this.open) this.doCancel(); }
}
