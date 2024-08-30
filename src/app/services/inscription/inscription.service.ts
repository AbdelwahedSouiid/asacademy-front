import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Inscription} from "../../model/inscription.model";
import {Avis} from "../../model/avis.model";
import {Cour} from "../../model/cour.model";
import {AppUser} from "../../model/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) {
  }

  url = environment.url + "/inscription";

  getInscriptions(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get(this.url + "/retrieve-all-Inscriptions", {headers});
  }

  ajouterInscription(inscription: Inscription): Observable<Inscription> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<Inscription>(this.url + "/add-Inscription", inscription, {headers});

  }

  detail(id: string): Observable<any> {
    return this.http.get(`${this.url}/retrieve-Inscription/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/remove-Inscription/${id}`);
  }

  update(inscription: Inscription): Observable<any> {
    return this.http.put(`${this.url}/modify-Inscription`, inscription);
  }

  getInscriptionsByUser(email: string): Observable<Inscription[]> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.get<Inscription[]>(`${this.url}/retrieve-inscriptions-By-User/${email}`, {headers});
  }
}
