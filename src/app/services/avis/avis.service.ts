import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Avis} from "../../model/avis.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private url = environment.url + "/avis";

  constructor(private http: HttpClient) {
  }

  addAvis(avis: Avis, courId: string): Observable<Avis> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const url = `${this.url}/add-Avis/${courId}`;
    return this.http.post<Avis>(url, avis, {headers});
  }


  // Récupérer tous les avis
  getAllAvis(): Observable<Avis[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Avis[]>(this.url + '/retrieve-all-Avis', {headers});
  }

  // Récupérer un avis par ID
  getAvisById(id: string): Observable<Avis> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Avis>(`${this.url}/retrieve-Avis/${id}`, {headers});
  }

  // Mettre à jour un avis
  updateAvis(id: string, avis: Avis): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/modify-Avis/${id}`, avis, {headers});
  }

  // Supprimer un avis
  deleteAvis(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/remove-Avis/${id}`, {headers});
  }


}
