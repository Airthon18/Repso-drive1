import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-carpeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-carpeta.component.html',
  styleUrls: ['./crear-carpeta.component.css']
})
export class CrearCarpetaComponent {
  nombreCarpeta: string = '';
  carpetaPrivada: boolean = false;
  permitirCompartir: boolean = true;
  carpetaCreada: boolean = false;

  constructor(private router: Router) {}

  onNombreChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.nombreCarpeta = target.value;
  }

  onPrivadaChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.carpetaPrivada = target.checked;
  }

  onCompartirChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.permitirCompartir = target.checked;
  }

  crearCarpeta() {
    if (this.nombreCarpeta && this.nombreCarpeta.length >= 3) {
      // Simular la creación de la carpeta
      console.log('Creando carpeta:', {
        nombre: this.nombreCarpeta,
        privada: this.carpetaPrivada,
        compartir: this.permitirCompartir
      });
      
      // Mostrar mensaje de éxito
      this.carpetaCreada = true;
      
      // Redirigir a la página de inicio después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
