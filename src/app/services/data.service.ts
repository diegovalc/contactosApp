import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL = environment.API_URI;


  constructor(private http: HttpClient) { }

  getContactos(){
    return this.http.get(`${this.URL}/contactos`);
  }

}
