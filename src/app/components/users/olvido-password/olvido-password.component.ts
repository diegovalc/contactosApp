import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-olvido-password',
  templateUrl: './olvido-password.component.html',
  styleUrls: ['./olvido-password.component.css']
})
export class OlvidoPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  })

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onResetPassword(){
    const {email} = this.resetPasswordForm.value;
    this.authService.resetPassword(email)
    .then((res)=>{
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      this.router.navigate(['/users/login']);
    }).catch((err)=>{
      console.log(err);
    });
    
  }

}
