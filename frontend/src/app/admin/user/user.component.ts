import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserComponent {
  //guarda contenido de la imagen seleccionada y puede ser de tipo string, buffer de datos o nulo
  imgAnterior: string | ArrayBuffer | null=null;

  mostrarImg(event: Event): void{
    // se obtiene el primer archivo seleccionado solo si files no es nulo o indefinido. files es una propiedad del input, el cual contiene una lista de archivos seleccionados por el user.
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if(archivo){
      const reader = new FileReader();
      //cuando el archivo termine de cargarse guarda una url en imgAnterior
      reader.onload = () => {
        this.imgAnterior = reader.result;
      };
      //lee el archivo como "url base64" y se puede usar directamente en el atributo src de <img>
      reader.readAsDataURL(archivo);
    }
  }

  selectImg(): void {
    const input = document.getElementById('fotoPerfil') as HTMLInputElement;
    input.click();//simula click en el input y abre el selector de archivos
  }
}

