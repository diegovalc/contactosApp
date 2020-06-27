import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

import Swal from 'sweetalert2'
import { Contacto } from '../../interfaces/Contacto';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {
  
  nuevoContactoForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    tipo_contacto: new FormControl('Movil',Validators.required),
    descripcion: new FormControl(''),
    foto: new FormControl('')
  })

  contacto: Contacto ={
    idcontacto: 0,
    nombres: '',
    apellidos: '',
    telefono: '',
    descripcion: '',
    email: '',
    tipo_contacto: '',
    foto: '',
    idusuario: '',
    fecha_creacion: new Date()
  }

  idusuario: string;
  nombreImagen: string;
  imagen: string;
  filePath: string;
  urlImagen: string;
  uploadPercent = 0;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUserId();

  }

  onNuevo(){
    this.spinner.show();
    const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.imagen);

    // Va mostrando el porcentaje de la subida
    task.percentageChanges().subscribe( (porcentaje)=>{
      this.uploadPercent = Math.round(porcentaje);
    });

    //al subir la imagen oculta el spinner y guarda en la base de datos la info del contacto
    task.then(result=>{
      console.log(result.state);
      ref.getDownloadURL().subscribe((url)=>{
        console.log(url);
        this.contacto = this.nuevoContactoForm.value
        this.contacto.idusuario = this.idusuario;
        this.contacto.foto = url;
        this.spinner.hide();
        this.saveContacto(this.contacto);
      })
    });

    //bloque que guarda datos del contacto en la bd
    /* 
    this.contacto = this.nuevoContactoForm.value
    this.contacto.idusuario = this.idusuario;
    console.log('objeto despues de llenarlo con form',this.contacto);
    this.dataService.saveContacto(this.contacto).subscribe(
      res=>{
        console.log(res);
        Swal.fire(
          'Contacto Guardado!',
          '',
          'success'
        );
        this.router.navigate(['/contactos']);
      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intente de nuevo',
        })
      }
    ); */
  }

  getUserId(){
    this.authService.getCurrentUser().subscribe( user=>{
      if (user){
        this.idusuario = user.uid;      
      }
    })
  }

  preUpload(event){
    this.nombreImagen = Math.random().toString(36).substring(2);
    this.imagen = event.target.files[0];
    this.filePath = `images/${this.nombreImagen}`;
    /* const ref = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, this.imagen);
    task.percentageChanges().subscribe( (porcentaje)=>{
      this.uploadPercent = porcentaje;
      console.log(this.uploadPercent);
      
      if (this.uploadPercent == 100) {
        this.contacto = this.nuevoContactoForm.value
        console.log('completado',this.contacto);
        ref.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
          console.log('url',this.urlImagen);
          
        })
      }
    }); */
  }

  saveContacto(contacto: Contacto){
    this.dataService.saveContacto(contacto).subscribe(
      res=>{
        console.log(res);
        Swal.fire(
          'Contacto Guardado!',
          '',
          'success'
        );
        this.router.navigate(['/contactos']);
      },err=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal, intente de nuevo',
        })
      }
    ); 
  }

}
