import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferirComponent } from '../../perfil/acciones/transferir/transferir.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TransferirComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  activo='recientes';

  // Propiedades para los modales
  mostrarModalCrearCarpeta = false;
  mostrarModalSubirArchivos = false;
  nombreCarpeta = '';
  archivosSeleccionados: File[] = [];

  // Propiedades para el menú contextual
  mostrarModalContextual = false;
  elementoSeleccionado: any = null;
  posicionModal = { x: 0, y: 0 };

  constructor(private router: Router) {}
  cambiarTab(tab: string){
    this.activo = tab;
  }

  favoritos = [
    {document: '', activo: true}
  ]

  estrellaActiva = false;

  irACompartidos() {
    this.router.navigate(['/compartidos']);
  }

  abrirCarpeta(nombreCarpeta: string) {
    this.router.navigate(['/carpeta', nombreCarpeta]);
  }

  navegarACrearCarpeta() {
    this.router.navigate(['/crear-carpeta']);
  }

  // Métodos para el modal de crear carpeta
  abrirModalCrearCarpeta(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.mostrarModalCrearCarpeta = true;
    this.nombreCarpeta = '';
  }

  cerrarModalCrearCarpeta() {
    this.mostrarModalCrearCarpeta = false;
    this.nombreCarpeta = '';
  }

  crearCarpeta() {
    if (this.nombreCarpeta.trim()) {
      console.log('Creando carpeta:', this.nombreCarpeta);
      // Aquí iría la lógica para crear la carpeta
      this.cerrarModalCrearCarpeta();
    }
  }

  // Métodos para el modal de subir archivos
  abrirModalSubirArchivos() {
    this.mostrarModalSubirArchivos = true;
    this.archivosSeleccionados = [];
  }

  cerrarModalSubirArchivos() {
    this.mostrarModalSubirArchivos = false;
    this.archivosSeleccionados = [];
  }

  onArchivosSeleccionados(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.archivosSeleccionados = Array.from(files);
    }
  }
  subirArchivos() {
    if (this.archivosSeleccionados.length > 0) {
      console.log('Subiendo archivos:', this.archivosSeleccionados);
      // Aquí iría la lógica para subir los archivos
      this.cerrarModalSubirArchivos();
    }
  }

  eliminarArchivo(index: number) {
    this.archivosSeleccionados.splice(index, 1);
  }

  // Métodos para el menú contextual
  abrirModalContextual(event: MouseEvent, elemento: any) {
    event.preventDefault();
    this.elementoSeleccionado = elemento;
    this.posicionModal = {
      x: event.clientX,
      y: event.clientY
    };
    this.mostrarModalContextual = true;

    // Agregar listener para cerrar con Escape
    setTimeout(() => {
      document.addEventListener('keydown', this.handleEscapeKey);
    }, 0);
  }
  cerrarModalContextual() {
    // Cerrar inmediatamente sin transiciones
    this.mostrarModalContextual = false;
    this.elementoSeleccionado = null;
    // Remover listener de Escape
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  // Método para manejar la tecla Escape
  handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.cerrarModalContextual();
    }
  }

  eliminarElemento() {
    if (this.elementoSeleccionado) {
      console.log('Eliminando elemento:', this.elementoSeleccionado);
      // Aquí iría la lógica para eliminar el elemento
      this.cerrarModalContextual();
    }
  }
  verDetalles() {
    if (this.elementoSeleccionado) {
      console.log('Ver detalles de:', this.elementoSeleccionado);
      // Aquí iría la lógica para mostrar detalles
      alert(`Detalles de ${this.elementoSeleccionado.nombre}:\n\nTipo: ${this.elementoSeleccionado.tipo}\nNombre: ${this.elementoSeleccionado.nombre}`);
      this.cerrarModalContextual();
    }
  }

  descargarElemento() {
    if (this.elementoSeleccionado) {
      console.log('Descargando elemento:', this.elementoSeleccionado);
      // Aquí iría la lógica para descargar
      alert(`Descargando ${this.elementoSeleccionado.nombre}...`);
      this.cerrarModalContextual();
    }
  }

  // ======== TRANSFERIR ========
  transferOpen = false;

  onTransfer(): void {
    this.transferOpen = true;
  }

  closeTransfer(): void {
    this.transferOpen = false;
  }

  confirmTransfer(data: any): void {
    console.log('Transferencia confirmada desde Home:', data);
    this.closeTransfer();
  }

}
