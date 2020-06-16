import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

//Servicio de los alerts
import { ToastrService } from 'ngx-toastr';
//Servicio de spinner
import { NgxSpinnerService } from 'ngx-spinner'


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

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

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
              //console.log('guardado correctamente', user);
              this.spinner.hide();
              this.router.navigate(['/contactos']);
              this.toastr.info(user.displayName,'Bienvenido');
            }).catch(err=>{ this.toastr.error(err.message,'Algo salio mal');});
          }
        })
      }
    }).catch((err)=>{
      this.toastr.error(err.message,'Algo salio mal');
      this.spinner.hide();
    })
  }


}
