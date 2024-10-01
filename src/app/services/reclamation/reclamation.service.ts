import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Reclamation} from "../../model/reclamation.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private url = environment.url + "/reclamation";


  constructor(private http: HttpClient) {
  }

  // Récupérer tous les Reclamations
  getReclamations(): Observable<Reclamation[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reclamation[]>(this.url + '/retrieve-all-Reclamations', {headers});
  }

  // Ajouter un Reclamation
  addReclamation(Reclamation: Reclamation): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/add-Reclamation', Reclamation, {headers});
  }

  // Récupérer un Reclamation par ID
  getReclamationById(id: string): Observable<Reclamation> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Reclamation>(`${this.url}/retrieve-Reclamation/${id}`, {headers});
  }

  // Mettre à jour un Reclamation
  updateReclamation(id: string, Reclamation: Reclamation): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/modify-Reclamation/${id}`, Reclamation, {headers});
  }

  // Supprimer un Reclamation
  deleteReclamation(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/remove-Reclamation/${id}`, {headers});
  }

  // Télécharger une image de profil pour un Reclamation
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
