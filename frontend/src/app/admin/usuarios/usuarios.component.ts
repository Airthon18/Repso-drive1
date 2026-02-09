import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { UsuariosService, Usuario } from './usuarios.service';

/*
interface Usuario{
  nombre: string;
  correo: string;
  identificacion: string;
  estado: string;
  ultimaActividad: string;
  almacenamientoTotal: string;
  almacenamientoUsado: string;
  activo?: boolean;
}*/

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UserComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})


export class UsuariosComponent implements OnInit {
  vista: 'usuarios' | 'almacenamiento' = 'usuarios';

  usuarios: Usuario[] = [
    {
      nombre: "Ana Torres",
      correo: "ana.torres@example.com",
      identificacion: "DNI 45896321",
      estado: "Activo",
      ultimaActividad: "2025-11-07 14:32",
      almacenamientoTotal: "50 GB",
      almacenamientoUsado: "12.5 GB",
      activo: true
    },
    {
      nombre: "Luis Fernández",
      correo: "luis.fernandez@example.com",
      identificacion: "DNI 78965412",
      estado: "Inactivo",
      ultimaActividad: "2025-10-30 09:15",
      almacenamientoTotal: "100 GB",
      almacenamientoUsado: "87.2 GB",
      activo: false
    },
    {
      nombre: "María López",
      correo: "maria.lopez@example.com",
      identificacion: "DNI 12345678",
      estado: "Activo",
      ultimaActividad: "2025-11-08 18:05",
      almacenamientoTotal: "75 GB",
      almacenamientoUsado: "33.4 GB",
      activo: true
    },
    {
      nombre: "Carlos Gómez",
      correo: "carlos.gomez@example.com",
      identificacion: "DNI 45678912",
      estado: "Activo",
      ultimaActividad: "2025-11-09 10:20",
      almacenamientoTotal: "60 GB",
      almacenamientoUsado: "25.1 GB",
      activo: true
    }
  ];


  usuariosFiltrados: Usuario[] = [];
  filtroEstado: string = 'Activos';
  filtroCargo: string = 'Todos los cargos';
  currentPage: number = 1;

  constructor(private usuariosService: UsuariosService){}

  ngOnInit(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.aplicarFiltros();
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  aplicarFiltros(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      // Filtro por estado
      const coincideEstado = this.filtroEstado === 'Activos' ?
        usuario.estado === 'activo' :
        this.filtroEstado === 'Inactivos' ?
        usuario.estado === 'inactivo' :
        true;

      // Filtro por cargo (asumiendo que el cargo está en el nombre o se necesita agregar al modelo)
      // Por ahora filtramos por si contiene 'admin' en el nombre para Admin
      const coincideCargo = this.filtroCargo === 'Todos los cargos' ?
        true :
        this.filtroCargo === 'Admin' ?
        usuario.nombre.toLowerCase().includes('admin') :
        !usuario.nombre.toLowerCase().includes('admin');

      return coincideEstado && coincideCargo;
    });
  }

  onFiltroEstadoChange(event: any): void {
    this.filtroEstado = event.target.value;
    this.aplicarFiltros();
  }

  onFiltroCargoChange(event: any): void {
    this.filtroCargo = event.target.value;
    this.aplicarFiltros();
  }

  setPage(n: number): void {
    this.currentPage = n;
    if (n === 2) {
      this.filtroEstado = 'Inactivos';
    } else if (n === 1) {
      this.filtroEstado = 'Activos';
    }
    this.aplicarFiltros();
  }

  recargarUsuarios(): void {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.aplicarFiltros();
      },
      error: (err) => console.error('Error recargando usuarios', err)
    });
  }

  mostrarUsuarios() {
    this.vista = 'usuarios';
  }

  mostrarAlmacenamiento() {
    this.vista = 'almacenamiento';
  }
}
