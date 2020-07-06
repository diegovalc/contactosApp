import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any[] {
    
    if (texto==='') {
      return arreglo;
    }

    texto = texto.toLowerCase();
    return arreglo.filter( contacto =>{
      return contacto[columna].toLowerCase().includes( texto);
    })
    
  }

}
