import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cour} from "../../model/cour.model";

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8081/projet/cour";

  getCours(): Observable<any> {
  const headers = new HttpHeaders().set( "Content-Type", "application/json");
    return this.http.get(this.url + "/retrieve-all-Cours", {headers});
  }

  ajouterCour(cour: Cour): Observable<any> {

    const headers = new HttpHeaders().set( "Content-Type", "application/json");

    return this.http.post(this.url + "/add-Cour", cour, {headers});
  }

}
