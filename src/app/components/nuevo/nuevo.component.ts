import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  
  nuevoContactoForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, Validators.email]),
    tipo_contacto: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
    console.log('nuevo component');
  }

  onNuevo(){

  }

}
