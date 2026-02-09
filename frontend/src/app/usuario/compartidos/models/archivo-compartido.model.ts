export interface ArchivoCompartido {
  id: number;
  nombre: string;
  tamano: number;
  propietario: string;
  fecha: Date;
  permiso: 'ver' | 'editar';
  icono: string;
}
