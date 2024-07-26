import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Categorie} from "../../model/categorie.model";
import {Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

   private url = 'http://localhost:8081/projet/categorie';

  constructor(private http: HttpClient) {}

  addCategorie(categorie: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/add-Categorie', categorie, { headers });
  }

  getCategories(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.url + '/retrieve-all-Categories', { headers });
  }


}
