import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Title } from '@angular/platform-browser';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = '';
  ventana = '';
  contenido: SafeHtml = ``;
  vistas: any[] = [];
  usuarioActivo = false;
  sidebarVisible = true;
  modoFlotante = false;
  modoFlotanteActivo = false;


  toggleSidebar() {
   if(this.modoFlotante) {
     this.modoFlotanteActivo = !this.modoFlotanteActivo;
   } else {
     this.sidebarVisible = !this.sidebarVisible;
   }
  }

  constructor(
    private sanitizer: DomSanitizer,
    private router:Router,
    private titleService: Title){}


  vistasAdmin =[
    {
      nombre: "Usuarios",
      ruta: "/usuarios",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="9.00098" cy="6" r="4" fill="#233261"></circle> <ellipse cx="9.00098" cy="17.001" rx="7" ry="4" fill="#233261"></ellipse> <path d="M20.9996 17.0005C20.9996 18.6573 18.9641 20.0004 16.4788 20.0004C17.211 19.2001 17.7145 18.1955 17.7145 17.0018C17.7145 15.8068 17.2098 14.8013 16.4762 14.0005C18.9615 14.0005 20.9996 15.3436 20.9996 17.0005Z" fill="#233261"></path> <path d="M17.9996 6.00073C17.9996 7.65759 16.6565 9.00073 14.9996 9.00073C14.6383 9.00073 14.292 8.93687 13.9712 8.81981C14.4443 7.98772 14.7145 7.02522 14.7145 5.99962C14.7145 4.97477 14.4447 4.01294 13.9722 3.18127C14.2927 3.06446 14.6387 3.00073 14.9996 3.00073C16.6565 3.00073 17.9996 4.34388 17.9996 6.00073Z" fill="#233261"></path> </g></svg>`)
    },
    {
      nombre: "Almacenamiento",
      ruta: "/almacenamiento",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 13.3529C22 16.0599 20.0726 18.3221 17.5 18.8722M6.28571 19C3.91878 19 2 17.1038 2 14.7647C2 12.4256 3.91878 10.5294 6.28571 10.5294C6.56983 10.5294 6.8475 10.5567 7.11616 10.6089M14.381 8.02721C14.9767 7.81911 15.6178 7.70588 16.2857 7.70588C16.9404 7.70588 17.5693 7.81468 18.1551 8.01498M7.11616 10.6089C6.88706 9.9978 6.7619 9.33687 6.7619 8.64706C6.7619 5.52827 9.32028 3 12.4762 3C15.4159 3 17.8371 5.19371 18.1551 8.01498M7.11616 10.6089C7.68059 10.7184 8.20528 10.9374 8.66667 11.2426M18.1551 8.01498C18.8381 8.24853 19.4623 8.60648 20 9.06141" stroke="#233261" stroke-width="1.5" stroke-linecap="round"></path> <path d="M14 19H12L10 19" stroke="#233261" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`)
    },
  ]

  vistasUser = [
    {
      nombre: "Inicio",
      ruta: "/home",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke="#233261" stroke-width="1.5" stroke-linecap="round"></path> <path d="M22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274" stroke="#233261" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`)
    },
    {
      nombre: "Mis archivos",
      ruta: "/misArchivos",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="m80 38 4.243-4.243A6 6 0 0 0 80 32v6Zm16 16-4.243 4.243A6 6 0 0 0 96 60v-6Zm58 94H38v12h116v-12ZM28 138V54H16v84h12Zm10-94h42V32H38v12Zm37.757-1.757 16 16 8.486-8.486-16-16-8.486 8.486ZM164 70v68h12V70h-12ZM96 60h58V48H96v12Zm-58 88c-5.523 0-10-4.477-10-10H16c0 12.15 9.85 22 22 22v-12Zm116 12c12.15 0 22-9.85 22-22h-12c0 5.523-4.477 10-10 10v12Zm22-90c0-12.15-9.85-22-22-22v12c5.523 0 10 4.477 10 10h12ZM28 54c0-5.523 4.477-10 10-10V32c-12.15 0-22 9.85-22 22h12Z"></path></g></svg>`)
    },
    {
      nombre: "Compartidos",
      ruta: "/compartidos",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M108.92 70.323a35.784 36.301 0 1 1 25.311 61.978c-19.77 0-28.157-19.055-38.213-36.301C85.28 77.6 77.576 59.699 57.805 59.699a35.784 36.301 0 1 0 25.045 62.209" class="a" style="fill:none;stroke:#000000;stroke-width:12;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none"></path></g></svg>`)
    },
    {
      nombre: "Configuración",
      ruta: "/configuracion",
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#233261" stroke-width="1.5"></circle> <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273" stroke="#233261" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>`)
    },
  ]

  mostrarSidebar = true;

  Logout() {
    localStorage.removeItem('sessionUser');
    this.vistas = [];
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.mostrarSidebar = window.innerWidth >= 1024;
    this.modoFlotante = window.innerWidth < 1024;
    window.addEventListener('resize', ()=> {
      this.mostrarSidebar = window.innerWidth >=1024;
      this.modoFlotante = window.innerWidth < 1024;
    });

    const user = JSON.parse(localStorage.getItem('sessionUser') || 'null');
    this.usuarioActivo = !!user ?.estate;
    if(user){
      switch(user.role){
        case 'admin':
          this.router.navigate(['/usuarios']);
          this.vistas = this.vistasAdmin;
          break;
        case 'user':
          this.router.navigate(['/home']);
          this.vistas = this.vistasUser;
          break;
        default:
          this.router.navigate(['/login']);
          this.vistas = [];
      }
    }

    //Header. Detectar la ruta actual con ActivatedRoute
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      tap(event =>{
        const url = event.urlAfterRedirects;

        if(url.includes('/home')){
          this.title = 'Mi Drive';
          this.ventana = 'Mi Drive';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <input type="text" class="xl:basis-9/12 lg:basis-8/12 md:basis-7/12 border border-gray-400 focus:outline-none focus:border-2 focus:border-gray-500  bg-gray-100 caret-gray-500 rounded-lg px-3 py-1" placeholder="Buscar archivos">
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md px-4 py-1 flex items-center justify-center ml-2">
              <svg class="inline-block w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              Invitar
            </button>
            <div class="flex justify-center items-center me-2 ml-auto">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-1.5 flex items-center">
                <svg class="inline-block w-5 h-5" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></g></svg>
              </button>
            </div>
            <div class="flex justify-center items-center me-2">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-0.5 flex items-center">
                <svg class="inline-block w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </button>
            </div>
          `);

        } else if(url.includes('/almacenamiento')){
          this.title = 'Almacenamiento';
          this.ventana = 'Gestión de Almacenamiento';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <div></div>
          `);

        } else if(url.includes('/compartidos')){
          this.title = 'Compartidos';
          this.ventana ='Compartidos';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <input type="text" class="xl:basis-9/12 lg:basis-8/12 md:basis-7/12 border border-gray-400 focus:outline-none focus:border-2 focus:border-gray-500 bg-gray-100 caret-gray-500 rounded-lg px-3 py-1" placeholder="Buscar archivos">
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md mx-2 px-2 py-1 flex items-center justify-center">
            <svg class="inline-block w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              Invitar amigos
            </button>
            <div class="flex justify-center items-center me-2 ml-auto">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-1.5 flex items-center">
                <svg class="inline-block w-5 h-5" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></g></svg>
              </button>
            </div>
            <div class="flex justify-center items-center me-2">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-0.5 flex items-center">
                <svg class="inline-block w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </button>
            </div>
          `);

        } else if(url.includes('/configuracion')){
          this.title = 'Configuración';
          this.ventana ='Configuración';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <input type="text" class="xl:basis-9/12 lg:basis-8/12 md:basis-7/12 border border-gray-400 focus:outline-none focus:border-2 focus:border-gray-500  bg-gray-100 caret-gray-500 rounded-lg px-3 py-1" placeholder="Buscar archivos">
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md px-4 py-1 flex items-center justify-center ml-2">
              <svg class="inline-block w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 18L14 18M17 15V21M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              Invitar
            </button>
            <div class="flex justify-center items-center me-2 ml-auto">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-1.5 flex items-center">
                <svg class="inline-block w-5 h-5" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"></path></g></svg>
              </button>
            </div>
            <div class="flex justify-center items-center me-2">
              <button type="button" class="bg-gray-200 hover:bg-gray-100 border border-black rounded-full p-0.5 flex items-center">
                <svg class="inline-block w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V16.9929M12 14.8571C12 11.6429 15 12.3571 15 9.85714C15 8.27919 13.6568 7 12 7C10.6567 7 9.51961 7.84083 9.13733 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
              </button>
            </div>
          `);

        } else if(url.includes('/usuarios')){
          this.title = 'Gestión de Usuarios';
          this.ventana ='Gestión de Usuarios';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <div></div>
          `);

        } else if(url.includes('/misArchivos')){
          this.title = 'Mis Archivos';
          this.ventana ='Mis Archivos';
          this.contenido = this.sanitizer.bypassSecurityTrustHtml(`
            <input type="text" class="xl:basis-6/12 lg:basis-5/12 md:basis-4/12 border border-gray-400 focus:outline-none focus:border-2 focus:border-gray-500  bg-gray-100 caret-gray-500 rounded-lg px-3 py-1" placeholder="Buscar archivos">
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md ml-auto px-2 py-1 flex items-center">
              <svg class="inline-block w-5 h-5 me-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z" fill="#000000"></path> <path d="M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z" fill="#000000"></path> </g></svg>
              Subir carpeta
            </button>
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md ml-4 px-2 py-1 flex items-center">
              <svg class="inline-block w-5 h-5 me-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 5C4.25 3.48122 5.48122 2.25 7 2.25H14.9868C15.5506 2.25 16.0798 2.52157 16.4085 2.97955L19.4217 7.17745C19.6352 7.47488 19.75 7.83178 19.75 8.1979V19C19.75 20.5188 18.5188 21.75 17 21.75H7C5.48122 21.75 4.25 20.5188 4.25 19V5ZM7 3.75C6.30964 3.75 5.75 4.30964 5.75 5V19C5.75 19.6904 6.30964 20.25 7 20.25H17C17.6904 20.25 18.25 19.6904 18.25 19V8.89705H15C14.5858 8.89705 14.25 8.56126 14.25 8.14705V3.75H7Z" fill="#000000"></path> <path d="M15.0857 13.2185C14.8269 13.542 14.355 13.5944 14.0315 13.3357L12.7501 12.3105V15.75C12.7501 16.1642 12.4143 16.5 12.0001 16.5C11.5858 16.5 11.2501 16.1642 11.2501 15.75V12.3104L9.96855 13.3357C9.6451 13.5944 9.17313 13.542 8.91438 13.2185C8.65562 12.8951 8.70806 12.4231 9.03151 12.1643L11.5288 10.1665C11.6561 10.0636 11.8177 10.0015 11.9937 10C11.9958 10 11.9979 10 12.0001 10L12.0025 10C12.1816 10.0006 12.3459 10.0639 12.4746 10.1692L14.9685 12.1643C15.292 12.4231 15.3444 12.8951 15.0857 13.2185Z" fill="#000000"></path> </g></svg>
              Subir archivo
            </button>
            <button type="button" class="bg-gray-200 hover:bg-gray-100 border-none rounded-md mx-4 px-2 py-1 flex items-center">
              <svg class="inline-block w-5 h-5 me-1" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M41.64,50.37h-32a2,2,0,0,1-2-2V15.63a2,2,0,0,1,2-2H23.32L28.75,20H54.39a2,2,0,0,1,2,2V37.33"></path><circle cx="50.24" cy="45.23" r="10.01" stroke-linecap="round"></circle><line x1="50.24" y1="39.76" x2="50.24" y2="50.71"></line><line x1="44.76" y1="45.23" x2="55.72" y2="45.23"></line></g></svg>
              Nueva carpeta
            </button>
          `);
        }

        this.titleService.setTitle(`${this.title} | Wolke`);
      })
    ).subscribe();
  }
}
