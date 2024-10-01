import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Formateur} from "../../model/formateur.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private url = environment.url + "/formateur";

  constructor(private http: HttpClient) {
  }

  // Récupérer tous les formateurs
  getFormateurs(): Observable<Formateur[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Formateur[]>(this.url + '/retrieve-all-Formateurs', {headers});
  }

  // Ajouter un formateur
  addFormateur(formateur: Formateur): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/add-Formateur', formateur, {headers});
  }

  // Récupérer un formateur par ID
  getFormateurById(id: string): Observable<Formateur> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Formateur>(`${this.url}/retrieve-Formateur/${id}`, {headers});
  }

  // Mettre à jour un formateur
  updateFormateur(id: string, formateur: Formateur): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/modify-Formateur/${id}`, formateur, {headers});
  }

  // Supprimer un formateur
  deleteFormateur(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/remove-Formateur/${id}`, {headers});
  }

  // Télécharger une image de profil pour un formateur
  uploadImage(file: File, id: string): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', file);

    const request = new HttpRequest('POST', this.url + '/uploadImage/' + id, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(request);
  }
}
