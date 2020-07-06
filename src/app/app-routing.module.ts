import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { OlvidoPasswordComponent } from './components/users/olvido-password/olvido-password.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users/login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'users/register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'contactos', component: ContactosComponent, canActivate: [NoAuthGuard]},
  {path: 'nuevo', component: NuevoComponent, canActivate: [NoAuthGuard]},
  {path: 'users/reset', component: OlvidoPasswordComponent, canActivate: [AuthGuard]},
  {path: 'contactos/edit/:id', component: NuevoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
