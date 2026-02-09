import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})

export class ConfiguracionComponent {
  public activo = 'general';
  mostrarModal: boolean = false;
  dispositivoSeleccionado: string = '';

  TabActivo(tab: string) {
    this.activo = tab;
  }

  abrirModal(dispositivo: string) {
    this.dispositivoSeleccionado = dispositivo;
    this.mostrarModal = true;
  }

  cancelarCerrarSesion() {
    this.mostrarModal = false;
    this.dispositivoSeleccionado = '';
  }

  confirmarCerrarSesion() {
    // Aquí va la lógica real para cerrar sesión del dispositivo
    console.log('Cerrando sesión en:', this.dispositivoSeleccionado);

    // Simular cierre y ocultar el modal
    this.mostrarModal = false;
    this.dispositivoSeleccionado = '';
  }
}

