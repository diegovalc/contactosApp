import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto } from '../../interfaces/Contacto';
import { DataService } from '../../services/data.service';
import { FormGroup, FormControl } from '@angular/forms';

import * as moment from 'moment'; //importacion de libreria para calcular fechas
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


moment.locale('es'); //colocar en español la lubreria de momentjs


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  @ViewChild('contactModal', { static: true }) public contactModal;

  /* formBuscar = new FormGroup(
    textoBuscar: new FormControl
  )
 */
  contactos: any=[];
  contacto: Contacto={};

  fecha_creacion: string;
  textoBuscar = '';

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getContactos();
  }

  getContactos(){
    
    this.authService.getCurrentUser().subscribe( user=>{
      if (user){
        this.dataService.getContactos(user.uid)
        .subscribe(res=>{
          this.contactos = res;
          console.log(this.contactos);
          
        }
        )
        
      }
    })
    
  }

  mostrarModal(contacto: Contacto){
    this.contacto = contacto
    this.fecha_creacion = moment(contacto.fecha_creacion).fromNow();
    this.contactModal.show();
    console.log('fecha creacion',this.fecha_creacion);
  }

 borrarContacto(id: number){
  Swal.fire({
    title: '¿Esta seguro?',
    text: "El contacto sera eliminado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.value) {

      this.dataService.deleteContacto(id).subscribe(
        res=>{
          Swal.fire(
            'Eliminado!',
            'El contacto ha sido eliminado.',
            'success'
          )
          this.getContactos();
          this.contactModal.hide();
        }
      ),err=>{
        Swal.fire(
          'Algo salio mal!',
          'Intentelo de nuevo',
          'error'
        )
      }
    }
  })
  
 }

 editarContacto(id: number){
  console.log(id);
  
 }  

}
