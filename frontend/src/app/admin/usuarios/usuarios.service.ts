import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  /*id: number;
  nombre: string;
  correo: string;
  identificacion: string;
  estado: string;
  ultima_actividad: string | null;
  almacenamiento_total: number;
  espacio_usado: number;*/
  //id: number;
  //ultimaActividad: Date;
  //almacenamientoTotal: number;
  //almacenamientoUsado: number;
  nombre: string;
  correo: string;
  identificacion: string;
  estado: string;
  ultimaActividad: string;
  almacenamientoTotal: string;
  almacenamientoUsado: string;
  activo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private apiUrl = 'http://localhost:3001/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
