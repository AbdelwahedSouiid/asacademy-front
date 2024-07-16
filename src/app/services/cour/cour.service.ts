import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:8081/projet/cour";
  private name!: string;

  getCours():Observable<any>{
  const headers = new HttpHeaders().set( "Content-Type", "application/json");
  return this.http.get(this.url+"/findAll",{headers});
  }

  ajouterProduit():Observable<any>{

    const headers = new HttpHeaders().set( "Content-Type", "application/json");
    return this.http.post(this.url+"/",{headers});
  }

}
