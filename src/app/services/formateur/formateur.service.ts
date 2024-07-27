import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  url:string = 'http://localhost:8081/projet/formateur';

  constructor(private http:HttpClient) { }


  getFormateurs(): Observable<any> {
    const headers = new HttpHeaders().set( "Content-Type", "application/json");
    return this.http.get(this.url+ '/retrieve-all-Formateurs', {headers});
  }
}
