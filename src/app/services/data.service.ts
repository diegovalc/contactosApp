import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = environment.API_URI;
  

  constructor(private http: HttpClient) { }

  getContactos(){
    return this.http.get(`${this.URL}/contactos`);
  }
  addUser(usuario: User){
    return this.http.post(`${this.URL}/user`, usuario);
  }
  getUser(id: string){
    return this.http.get(`${this.URL}/user/${id}`);
  }

}
