import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

//Servicio de los alerts
import { ToastrService } from 'ngx-toastr';
//Servicio de spinner
import { NgxSpinnerService } from 'ngx-spinner'
import { DataService } from '../../../services/data.service';
import { User } from '../../../interfaces/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('',Validators.required),
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
    private router: Router, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dataService: DataService) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.spinner.show();
    const {email, password, nombres, apellidos} = this.registerForm.value;
    this.authService.registerWithMail(email, password).then((result)=>{
      if (result){
        this.authService.getCurrentUser().subscribe( user=>{
          if (user){
            user.updateProfile({
              displayName: nombres+ ' ' + apellidos
            }).then(res=>{
              this.usuario.idusuario = user.uid;      //paso datos de user que
              this.usuario.nombre =user.displayName;  //manda firebase y los
              this.usuario.email = user.email;        //los guardo en el objeto
              this.usuario.photourl = user.photoURL;  //usuario
              this.usuario.provider = user.providerId;
              
              this.dataService.addUser(this.usuario).subscribe(res=>{ //guardo el usuario en mi bd
                this.spinner.hide();
                this.router.navigate(['/contactos']);
                this.toastr.info(this.usuario.nombre,'Bienvenido');
              },err=>{
                this.toastr.error(err.message,'Algo salio mal');
              })
              
            }).catch(err=>{ 
              this.toastr.error(err.message,'Algo salio mal');
              console.log(err);
            });
          }
        })
      }
    }).catch((err)=>{
      console.log(err);
      this.toastr.error(err.message,'Algo salio mal');
      this.spinner.hide();
    })
  }

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
