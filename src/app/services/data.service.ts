import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { User } from '../interfaces/User';
import { Contacto } from '../interfaces/Contacto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = environment.API_URI;
  

  constructor(private http: HttpClient) { }

  getContactos(id: string){
    return this.http.get(`${this.URL}/contactos/user/${id}`);
  }
  addUser(usuario: User){
    return this.http.post(`${this.URL}/user`, usuario);
  }
  getUser(id: string){
    return this.http.get(`${this.URL}/user/${id}`);
  }
  saveContacto(contacto: Contacto){
    return this.http.post(`${this.URL}/contactos`, contacto);
  }

  deleteContacto(id: number){
    return this.http.delete(`${this.URL}/contactos/${id}`);
  }

}
