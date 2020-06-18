import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//mdboostrap module
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/users/register/register.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { Page404Component } from './components/page404/page404.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

//Modulo de alerts
import { ToastrModule } from 'ngx-toastr';
//Modulo del spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { OlvidoPasswordComponent } from './components/users/olvido-password/olvido-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    ContactosComponent,
    Page404Component,
    NuevoComponent,
    OlvidoPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width',
      timeOut: 4000,
      closeButton: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
