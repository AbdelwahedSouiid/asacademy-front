import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Categorie} from "../../model/categorie.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private url = `${environment.url}/categorie`;

  constructor(private http: HttpClient) {
  }

  // Ajouter une catégorie
  addCategorie(categorie: Categorie): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + '/add-Categorie', categorie, {headers});
  }

  getCategories(): Observable<Categorie[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Skip-Auth', 'true');

    return this.http.get<Categorie[]>(`${this.url}/retrieve-all-Categories`, {headers});
  }

  // Récupérer une catégorie par ID
  getCategorie(id: string): Observable<Categorie> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Categorie>(`${this.url}/retrieve-Categorie/${id}`, {headers});
  }

  // Mettre à jour une catégorie
  updateCategorie(id: string, categorie: Categorie): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.url}/modify-Categorie/${id}`, categorie, {headers});
  }

  // Supprimer une catégorie
  deleteCategorie(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.url}/remove-Categorie/${id}`, {headers});
  }
}
