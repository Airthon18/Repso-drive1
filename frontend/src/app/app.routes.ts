import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { UserComponent } from './admin/user/user.component';
import { HomeComponent } from './usuario/home/home.component';
import { CompartidosComponent } from './usuario/compartidos/compartidos.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { VistaPrueba2Component} from './admin/Almacenamiento/vista-prueba2.component';
import { ConfiguracionComponent } from './usuario/configuracion/configuracion.component';
import { PerfilComponent } from './usuario/misArchivos/perfil.component';
import { CarpetaComponent } from './usuario/carpeta/carpeta.component';
import { CrearCarpetaComponent } from './usuario/crear-carpeta/crear-carpeta.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: LayoutComponent, canActivateChild: [authGuard],
      children: [
        { path: 'home', component: HomeComponent, data: { role: 'user' } },
        { path: 'user', component: UserComponent, data: { role: 'admin' } },//modals-usuarios
        { path: 'usuarios', component: UsuariosComponent, data: { role: 'admin' } },
        { path: 'almacenamiento', component: VistaPrueba2Component, data: { role: 'admin' } },
        { path: 'configuracion', component: ConfiguracionComponent, data: { role: 'user' } },
        { path: 'compartidos', component: CompartidosComponent, data: { role: 'user' } },
        { path: 'misArchivos', component: PerfilComponent, data: { role: 'user' } },
        { path: 'carpeta/:nombre', component: CarpetaComponent, data: { role: 'user' } },
        { path: 'crear-carpeta', component: CrearCarpetaComponent, data: { role: 'user' } }
      ]
     },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
