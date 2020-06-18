import { Component, OnInit, ViewChild } from '@angular/core';
import { Contacto } from '../../interfaces/Contacto';
import { DataService } from '../../services/data.service';

import * as moment from 'moment';
moment.locale('es');


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  @ViewChild('contactModal', { static: true }) public contactModal;

  contactos: Contacto;
  contacto: Contacto={};

  

  fecha_creacion: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getContactos();
  }

  getContactos(){
    this.dataService.getContactos()
    .subscribe(res=>{
      this.contactos = res;
      console.log(this.contactos);
      
    }
    )
  }

  mostrarModal(contacto: Contacto){
    this.contacto = contacto
    this.fecha_creacion = moment(contacto.fecha_creacion).fromNow();
    this.contactModal.show();
    console.log('fecha creacion',this.fecha_creacion);
  }

}
