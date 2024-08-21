import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AppUser} from '../../model/user.model';
import {catchError} from 'rxjs/operators';
import {jwtDecode} from "jwt-decode";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  authenticatedUser!: AppUser;
  refreshToken!: string;
  isAuthenticated: boolean = false;
  roles: string[] = [];
  username: string | null = null;
  accessToken: string | null = null;
  photo: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.initializer();
  }

  login(username: string, password: string, checkbox: boolean): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('withRefreshToken', checkbox)
      .toString();

    return this.http.post<any>(this.url + "/login", body, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMessage = error.error?.['error message'] ?? 'Invalid username or password. Please try again.';
    }
    return throwError(errorMessage);
  }

  public hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  public authenticate(appUser: AppUser): void {
    this.authenticatedUser = appUser;
    localStorage.setItem('authUser', JSON.stringify({
      username: appUser.username,
      roles: appUser.roles,
      photo: appUser.photo || '',
      jwt: this.accessToken
    }));
    this.isAuthenticated = true;
    this.roles = appUser.roles;
    this.username = appUser.username;
  }

  loadProfile(data: any): void {
    this.accessToken = data['access_token'];
    this.refreshToken = data['refresh_token']
    if (this.accessToken) {
      const user = this.getUserFromToken(this.accessToken);
      if (user) {
        this.authenticate(user);
        localStorage.setItem('refresh_token', this.refreshToken);
      } else {
        console.error('Token decoding failed');
      }
    } else {
      console.error('Access token is null');
    }
  }

  private getUserFromToken(token: string): AppUser | null {
    try {
      const decodedJwt: any = jwtDecode(token);
      return {
        username: decodedJwt.sub,
        roles: decodedJwt.scope ? decodedJwt.scope.split(' ') : [],
        photo: decodedJwt.image_url

      } as AppUser;
    } catch (error) {
      console.error('Token decoding failed', error);
      this.clearToken();
      return null;
    }
  }

  private initializer(): void {
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      const parsedUser = JSON.parse(authUser);
      this.accessToken = parsedUser.jwt;
      this.roles = parsedUser.roles;
      this.username = parsedUser.username;
      this.isAuthenticated = true;
      this.photo = parsedUser.photo;
    }
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  clearToken(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated = false;
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.refreshToken || localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token available');
    }

    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    const body = new HttpParams()
      .set('refreshToken', refreshToken)
      .toString();

    return this.http.post<any>(this.url + "/refreshToken", body, {headers}).pipe(
      switchMap((data) => {
        this.accessToken = data['access_token'];
        this.refreshToken = data['refresh_token'];
        if (this.accessToken) {
          localStorage.setItem('authUser', JSON.stringify({
            username: this.username,
            roles: this.roles,
            photo: this.photo,
            jwt: this.accessToken
          }));
          localStorage.setItem('refresh_token', this.refreshToken);
          return of(data);
        } else {
          return throwError('Access token refresh failed');
        }
      }),
      catchError((error) => {
        this.logout();
        return throwError(error);
      })
    );
  }


}
