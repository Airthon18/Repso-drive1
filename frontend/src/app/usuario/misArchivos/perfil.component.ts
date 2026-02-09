import { Component } from '@angular/core';
import { CommonModule, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  VistaPorCuadriculasComponent,
  GridItem,
  GridTipo
 } from '../../perfil/vista-por-cuadriculas/vista-por-cuadriculas.component';

//Modals
import { RenombrarComponent } from '../../perfil/acciones/renombrar/renombrar.component';
import { CompartirComponent, ShareRole } from '../../perfil/acciones/compartir/compartir.component';
import { DescargarComponent } from '../../perfil/acciones/descargar/descargar.component';
import { EliminarComponent } from '../../perfil/acciones/eliminar/eliminar.component';
import { MoverComponent, MoveOption } from '../../perfil/acciones/mover/mover.component';


type RowType = 'folder' | 'imgfile' | 'pdf' | 'ppt' | 'video';

interface RowItem {
  id: string;
  name: string;
  type: RowType;
  modified: string;
  size: string;
  selected?: boolean;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule,
    NgSwitch,
    NgSwitchCase,
    VistaPorCuadriculasComponent,
    RenombrarComponent,
    CompartirComponent,
    DescargarComponent,
    EliminarComponent,
    MoverComponent],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent {
  // Control de vista (list/grid) que usas en el HTML
  view: 'list' | 'grid' = 'list';

  // Datos de ejemplo: reemplaza por los que te devuelve tu servicio
  rows: RowItem[] = [
    { id: 'f1', name: 'Documentos',              type: 'folder',  modified: '2025-08-15', size: '230 MB' },
    { id: 'f2', name: 'Imágenes',                type: 'folder',  modified: '2025-08-10', size: '50 MB'  },
    { id: 'f3', name: 'Proyectos',               type: 'folder',  modified: '2025-08-20', size: '67 MB'  },
    { id: 'i1', name: 'Foto_vacaciones.jpg',     type: 'imgfile', modified: '2025-08-18', size: '134 KB' },
    { id: 'p1', name: 'Informe_final.pdf',       type: 'pdf',     modified: '2025-08-19', size: '200 KB' },
    { id: 'p2', name: 'Presentacion_Tra01.pptx', type: 'ppt',     modified: '2025-08-21', size: '340 KB' },
    { id: 'v1', name: 'Video_tutorial.mp4',      type: 'video',   modified: '2025-08-17', size: '40 MB'  },
  ];

  // ===== Datos (grid) =====
  items: GridItem[] = [
    { titulo: 'Documentos',      tipo: 'carpeta'  as GridTipo, fecha: '10:58' },
    { titulo: 'Imágenes',        tipo: 'carpeta'  as GridTipo, fecha: '10:58' },
    { titulo: 'Proyectos',       tipo: 'carpeta'  as GridTipo, fecha: '10:58' },
    { titulo: 'Foto vacaciones', tipo: 'archivo'  as GridTipo, fecha: '10:58' },
    { titulo: 'Presentación',    tipo: 'archivo'  as GridTipo, fecha: '10:58' },
  ];

  // ---- LÓGICA DE SELECCIÓN ----
  selectedIds = new Set<string>();

  get hasSelection(): boolean {
    return this.selectedIds.size > 0;
  }

  get selectedCount(): number {
    return this.selectedIds.size;
  }

  toggleRowSelection(row: RowItem, checked: boolean): void {
    row.selected = checked;
    if (checked) this.selectedIds.add(row.id);
    else this.selectedIds.delete(row.id);
  }

  toggleSelectAll(checked: boolean): void {
    this.selectedIds.clear();
    this.rows.forEach(r => {
      r.selected = checked;
      if (checked) this.selectedIds.add(r.id);
    });
  }

  // 🔹 Lo dejamos público para que Angular pueda usarlo sin problemas
  getSelected(): RowItem[] {
    return this.rows.filter(r => this.selectedIds.has(r.id));
  }

  // ===== Renombrar =====
  renameOpen = false;
  renameTarget: RowItem | null = null;
  renameValue = '';

  onRename(): void {
    const sel = this.getSelected();
    if (!sel.length) return;
    this.renameTarget = sel[0];
    this.renameValue = this.renameTarget.name;
    this.renameOpen = true;
  }

  applyRename(newName: string): void {
    if (!this.renameTarget) return;
    const name = newName.trim();
    if (name) this.renameTarget.name = name;
    this.closeRename();
  }

  closeRename(): void {
    this.renameOpen = false;
    this.renameTarget = null;
    this.renameValue = '';
  }

  // ===== Compartir =====
  shareOpen = false;
  shareTarget: RowItem | null = null;
  shareEmail = '';
  shareMessage = '';
  currentRole: ShareRole = 'editor';

  onShare(): void {
    let sel = this.getSelected();
    if (!sel.length && this.rows.length) sel = [this.rows[0]];
    if (!sel.length) return;

    this.shareTarget = sel[0];
    this.shareEmail = '';
    this.shareMessage = '';
    this.currentRole = 'editor';
    this.shareOpen = true;
  }

  handleShareSend(evt: { email: string; message: string; role: ShareRole }): void {
    console.log('Compartir:', {
      target: this.shareTarget?.name,
      email: evt.email,
      message: evt.message,
      role: evt.role,
    });
    this.closeShare();
  }

  closeShare(): void {
    this.shareOpen = false;
    this.shareTarget = null;
    this.shareEmail = '';
    this.shareMessage = '';
    this.currentRole = 'editor';
  }

  // ===== Descargar =====
  downloadOpen = false;

  startDownload(): void {
    if (!this.hasSelection) return;
    this.downloadOpen = true;
  }

  onDownload(): void {
    this.startDownload();
  }

  closeDownload(): void {
    this.downloadOpen = false;
  }

  // ===== Eliminar =====
  deleteOpen = false;
  deletePrimaryName = '';

  onDelete(): void {
    if (!this.hasSelection) return;
    const first = this.getSelected()[0];
    this.deletePrimaryName = first?.name ?? '';
    this.deleteOpen = true;
  }

  confirmDelete(): void {
    this.rows = this.rows.filter(r => !this.selectedIds.has(r.id));
    this.selectedIds.clear();
    this.deleteOpen = false;
    this.deletePrimaryName = '';
  }

  closeDelete(): void {
    this.deleteOpen = false;
    this.deletePrimaryName = '';
  }

  // ===== Mover =====
  moveOpen = false;
  moveOptions: MoveOption[] = [];
  moveDefaultId = '';

  onMove(): void {
    if (!this.hasSelection) return;

    // Destinos posibles: solo carpetas
    const folders = this.rows.filter(r => r.type === 'folder');

    // No permitir elegir la misma carpeta si está seleccionada (mover “dentro de sí”)
    const forbidden = new Set(
      this.getSelected()
        .filter(r => r.type === 'folder')
        .map(r => r.id)
    );

    this.moveOptions = folders.map(f => ({
      id: f.id,
      name: f.name,
      disabled: forbidden.has(f.id),
    }));

    // Preseleccionar el primer destino válido
    const firstEnabled = this.moveOptions.find(o => !o.disabled);
    this.moveDefaultId = firstEnabled?.id || '';
    this.moveOpen = true;
  }

  closeMove(): void {
    this.moveOpen = false;
    this.moveOptions = [];
    this.moveDefaultId = '';
  }

  confirmMove(evt: { destinationId: string }): void {
    const destinationId = evt.destinationId;
    const destination = this.rows.find(r => r.id === destinationId);
    console.log('Mover ->', {
      destinationId,
      destinationName: destination?.name,
      items: this.getSelected().map(x => ({ id: x.id, name: x.name, type: x.type })),
    });

    // Aquí iría tu llamada al servicio para mover realmente.
    this.closeMove();
  }

  // Click desde el grid
  onGridItemClick(it: GridItem){ console.log('Grid item:', it); }

  /* ---- ACCIONES (puedes conectar con servicios reales) ----
  onRename(): void   { console.log('Renombrar ->',  this.getSelected()); }
  onShare(): void    { console.log('Compartir ->',  this.getSelected()); }
  onDownload(): void { console.log('Descargar ->',  this.getSelected()); }
  onDelete(): void   { console.log('Eliminar ->',   this.getSelected()); }
  onMove(): void     { console.log('Mover ->',      this.getSelected()); }*/
}
