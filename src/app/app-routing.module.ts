import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { OlvidoPasswordComponent } from './components/users/olvido-password/olvido-password.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users/login', component: LoginComponent},
  {path: 'users/register', component: RegisterComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'nuevo', component: NuevoComponent},
  {path: 'users/reset', component: OlvidoPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
