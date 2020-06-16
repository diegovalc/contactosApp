import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;
  nombreUsuario: string ;
  correoUsuario: string;
  fotoUsuario: string;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getLogged();
  }

  onLogOut(){
    this.authService.logOut();
  }

  getLogged(){
    this.authService.getCurrentUser().subscribe( user=>{
      if (user){
        this.isLogged = true;
        this.nombreUsuario = user.displayName;
        this.correoUsuario = user.email;
        this.fotoUsuario = user.photoURL;
      }
    })
  }

}
