import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
//servicio del toast
import { ToastrService } from 'ngx-toastr';
//Servicio del spinner
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../../services/data.service';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  })
  
  usuario: User={
    idusuario: '',
    nombre: '',
    email: '',
    photourl: '',
    provider: ''
  };

  constructor(
    private authService: AuthService,
    private dataService: DataService, 
    private router: Router, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {   
    
  }

  onLogin(){
    this.spinner.show();
    const {email, password} = this.loginForm.value
    this.authService.loginEmail(email, password)
    .then((result)=>{
      if(result){
        this.authService.getCurrentUser().subscribe( user=>{
          this.spinner.hide();
          this.router.navigate(['/contactos']);
          this.toastr.info(user.displayName,'Bienvenido');
        })
        
      }

    }).catch((error)=>{
      this.spinner.hide();
      this.toastr.error(error.message,'Algo salio mal');
    })
  }

  //Hacer login con Google
  onGoogleLogin(){
    this.authService.loginGoogle()
    .then((res)=>{
      console.log(res.user.uid);
      this.dataService.getUser(res.user.uid).subscribe(usuario=>{ //hace un select con el id que genera firebase para ver si ya esta en la bd el usuario
        if(usuario[0]){//si existe el usuario no lo guarda y redirecciona a la pagina de contactos
          console.log('existe el usuario', usuario);
          this.router.navigate(['/contactos']);
        }else{ //si no existe lo guarda en la bd en mysql
          this.usuario.idusuario = res.user.uid;      //paso datos de user que
          this.usuario.nombre =res.user.displayName;  //manda firebase y los
          this.usuario.email = res.user.email;        //los guardo en el objeto
          this.usuario.photourl = res.user.photoURL;  //usuario
          this.usuario.provider = res.user.providerId;
          this.dataService.addUser(this.usuario).subscribe(res=>{
            console.log('respuesta desde la api',res);
            this.router.navigate(['/contactos']);
          })
        }
      }); 
    }).catch((err)=>{
      console.log(err);
    });
  }

  onFacebookLogin(){
    this.authService.loginFacebook()
    .then((res)=>{
      this.dataService.getUser(res.user.uid).subscribe(usuario=>{ //hace un select con el id que genera firebase para ver si ya esta en la bd el usuario
        if(usuario[0]){//si existe el usuario no lo guarda y redirecciona a la pagina de contactos
          this.router.navigate(['/contactos']);
        }else{ //si no existe lo guarda en la bd en mysql
          this.usuario.idusuario = res.user.uid;      //paso datos de user que
          this.usuario.nombre =res.user.displayName;  //manda firebase y los
          this.usuario.email = res.user.email;        //los guardo en el objeto
          this.usuario.photourl = res.user.photoURL;  //usuario
          this.usuario.provider = res.user.providerId;
          this.dataService.addUser(this.usuario).subscribe(res=>{
            this.router.navigate(['/contactos']);
          })
        }
      }); 
    }).catch((err)=>{
      console.log(err);
    });
  }

}
