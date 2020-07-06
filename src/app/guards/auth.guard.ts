import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router){

  }
  isLogged: boolean;

  canActivate(){
      this.authService.getCurrentUser().subscribe(user=>{
        if (user) {
          
          this.router.navigate(['/contactos']);
          return false;
          
        }
      })
    return true;
  }
    
  
  
}
