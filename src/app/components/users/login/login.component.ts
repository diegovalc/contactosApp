import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
//servicio del toast
import { ToastrService } from 'ngx-toastr';
//Servicio del spinner
import { NgxSpinnerService } from 'ngx-spinner';

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
  
  constructor(
    private authService: AuthService, 
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

  onGoogleLogin(){
    this.authService.loginGoogle()
    .then((res)=>{
      this.router.navigate(['/contactos']);
    }).catch((err)=>{
      console.log(err);
    });
  }

  onFacebookLogin(){
    this.authService.loginFacebook()
    .then((res)=>{
      this.router.navigate(['/contactos']);
    }).catch((err)=>{
      console.log(err);
    });
  }

}
