import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { first, map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User;

  constructor( public afAuth: AngularFireAuth) { }

  loginEmail(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userData=> resolve(userData),
        err=> reject(err)
      )
    }) 
    
  }
  async registerWithMail(email: string, password: string){
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return result;
  }

 /*  registerWithMail(email: string, password: string) {
    return new Promise((resolve, reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userData=> resolve(userData),
        err=> reject(err)
      )
    })    
  } */

  async logOut(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
   
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(map( auth=> auth));
  }

  loginGoogle(){
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginFacebook(){
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  resetPassword(email: string){
    return this.afAuth.sendPasswordResetEmail(email);
  }

}
