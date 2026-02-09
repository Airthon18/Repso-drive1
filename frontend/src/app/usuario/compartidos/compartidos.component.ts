import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompartidosService } from './compartidos.service';
import { ArchivoCompartido as IArchivoCompartido } from './models/archivo-compartido.model';
import { FiltroBusquedaPipe } from './pipes/filtro-busqueda.pipe';
import { FormatoTamanioPipe } from './pipes/formato-tamanio.pipe';
import { DatePipe } from '@angular/common';

export interface UsuarioAcceso {
  id: number;
  nombre: string;
  permiso: 'lectura' | 'escritura';
}
/*
export interface ArchivoCompartido {
  id: number;
  nombre: string;
  tamano: number; // en bytes
  icono: string; // URL del ícono
  propietario: string;
  fecha: Date;
  permiso: 'lectura' | 'escritura';

  // Nuevos campos
  usuariosAcceso?: UsuarioAcceso[]; // lista de usuarios con acceso a este archivo
}*/

@Component({
  selector: 'app-compartidos',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    FiltroBusquedaPipe,
    DatePipe,
    FormatoTamanioPipe
  ],
  templateUrl: './compartidos.component.html',
  styleUrls: ['./compartidos.component.scss']
})
export class CompartidosComponent implements OnInit {

  archivos: IArchivoCompartido[] = [];
  busqueda: string = '';
  vista: 'grid' | 'lista' = 'grid';
  abrirFiltros: boolean = false;
  archivoSeleccionado?: IArchivoCompartido & { usuariosAcceso?: UsuarioAcceso[] };

  constructor(private compartidosService: CompartidosService) {}

  ngOnInit() {
    this.obtenerArchivos();
  }

  obtenerArchivos() {
    this.compartidosService.getCompartidos().subscribe({
      next: (data) => this.archivos = data,
      error: (err) => console.error('Error al cargar archivos compartidos', err)
    });
  }

  abrirDetalles(archivo: IArchivoCompartido) {
    this.archivoSeleccionado = archivo;
    if (!this.archivoSeleccionado.usuariosAcceso) {
      // Inicializa algunos usuarios de ejemplo
      this.archivoSeleccionado.usuariosAcceso = [
        { id: 1, nombre: 'Juan Pérez', permiso: 'lectura' },
        { id: 2, nombre: 'María López', permiso: 'escritura' }
      ];
    }
  }

  cerrarDetalles() {
    this.archivoSeleccionado = undefined;
  }

  abrirArchivo(archivo: IArchivoCompartido) {
    alert(`Abriendo archivo: ${archivo.nombre}`);
  }

  compartirArchivo(archivo: IArchivoCompartido) {
    alert(`Generando enlace de compartición para ${archivo.nombre}`);
  }

  quitarAccesoArchivo(archivo: IArchivoCompartido) {
    if (confirm(`¿Seguro que deseas quitar el acceso a ${archivo.nombre}?`)) {
      this.archivos = this.archivos.filter(a => a.id !== archivo.id);
      this.archivoSeleccionado = undefined;
    }
  }

  quitarAccesoUsuario(usuario: UsuarioAcceso) {
    if (!this.archivoSeleccionado) return;
    if (confirm(`¿Quitar acceso a ${usuario.nombre}?`)) {
      this.archivoSeleccionado.usuariosAcceso =
        this.archivoSeleccionado.usuariosAcceso!.filter(u => u.id !== usuario.id);
    }
  }

  cambiarPermiso(usuario: UsuarioAcceso, permiso: 'lectura' | 'escritura') {
    usuario.permiso = permiso;
  }

  cambiarVista() {
    this.vista = this.vista === 'grid' ? 'lista' : 'grid';
  }
}
