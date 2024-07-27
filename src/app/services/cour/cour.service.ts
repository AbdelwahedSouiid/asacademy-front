import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cour} from "../../model/cour.model";

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:8081/projet/cour";

  getCours(): Observable<any> {
  const headers = new HttpHeaders().set( "Content-Type", "application/json");
    return this.http.get(this.url + "/retrieve-all-Cours", {headers});
  }

  ajouterCour(cour: Cour): Observable<any> {

    const headers = new HttpHeaders().set( "Content-Type", "application/json");

    return this.http.post(this.url + "/add-Cour", cour, {headers});
  }

  uploadImage(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', this.url + '/uploadAffiche/' + id, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }


}
