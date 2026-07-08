import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carpeta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carpeta.component.html',
  styleUrl: './carpeta.component.css'
})
export class CarpetaComponent implements OnInit {
  nombreCarpeta: string = '';
  rutaActual: string = '';
  
  // Contenido de la carpeta (simulado)
  archivos = [
    { nombre: 'Documento1.pdf', tipo: 'pdf', tamano: '2.5 MB', fecha: '2024-01-15', icono: '📄' },
    { nombre: 'Presentación.pptx', tipo: 'ppt', tamano: '15.8 MB', fecha: '2024-01-14', icono: '📊' },
    { nombre: 'Reporte Enero.xlsx', tipo: 'excel', tamano: '1.2 MB', fecha: '2024-01-13', icono: '📈' },
    { nombre: 'Imagen proyecto.jpg', tipo: 'imagen', tamano: '3.7 MB', fecha: '2024-01-12', icono: '🖼️' },
    { nombre: 'Carpeta de trabajo', tipo: 'carpeta', tamano: '--', fecha: '2024-01-11', icono: '📁' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el nombre de la carpeta de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.nombreCarpeta = params['nombre'] || 'Carpeta sin nombre';
      this.rutaActual = `/home/${this.nombreCarpeta}`;
    });
  }

  // Navegación
  volverAHome() {
    this.router.navigate(['/home']);
  }

  // Métodos para los archivos
  abrirArchivo(archivo: any) {
    console.log('Abrir archivo:', archivo.nombre);
    // Aquí iría la lógica para abrir el archivo
  }

  descargarArchivo(archivo: any) {
    console.log('Descargar archivo:', archivo.nombre);
    alert(`Descargando ${archivo.nombre}...`);
  }

  verDetallesArchivo(archivo: any) {
    console.log('Ver detalles de:', archivo.nombre);
    alert(`Detalles de ${archivo.nombre}:\n\nTipo: ${archivo.tipo}\nTamaño: ${archivo.tamano}\nFecha: ${archivo.fecha}`);
  }

  eliminarArchivo(archivo: any) {
    console.log('Eliminar archivo:', archivo.nombre);
    if (confirm(`¿Estás seguro de que quieres eliminar ${archivo.nombre}?`)) {
      // Aquí iría la lógica para eliminar
      this.archivos = this.archivos.filter(a => a !== archivo);
    }
  }

  // Métodos para ordenar
  ordenarPorNombre() {
    this.archivos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  ordenarPorFecha() {
    this.archivos.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }

  ordenarPorTamano() {
    this.archivos.sort((a, b) => {
      const tamanoA = parseFloat(a.tamano.replace(' MB', '')) || 0;
      const tamanoB = parseFloat(b.tamano.replace(' MB', '')) || 0;
      return tamanoB - tamanoA;
    });
  }
}
