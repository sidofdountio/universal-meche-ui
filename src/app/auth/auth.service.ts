import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthenticationRequest } from '../model/authentication-request';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationResponse } from '../model/authentication-response';
import { Route, Router } from '@angular/router';
import { RegisterRequest } from '../model/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  private readonly baseUrl: string = environment.URL;
  private readonly API_TOKEN: string = 'API_TOKEN';
  tokenValid$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(): Observable<boolean> {
    return of(true).pipe(

      tap(() => this.isLoggedIn = true)
    );
  }

  login$ = (userRequest: AuthenticationRequest) => <Observable<AuthenticationResponse>>this.http
    .post<AuthenticationResponse>(`${this.baseUrl}/auth/authenticate`, userRequest,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:8080/api/v1/hair/auth/authenticate'
        })
      })
    .pipe(
      map(response => {
        const token = response.token;
        localStorage.setItem("username", userRequest.email);
        console.log(response.token);
        this.setAuthToken(token as string);
        return response;
      }),
      catchError(this.handlerError)
    );

  register$ = (userRequest: RegisterRequest) => <Observable<AuthenticationResponse>>this.http
    .post<AuthenticationResponse>(`${this.baseUrl}/auth/register`, userRequest,
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': ' http://localhost:8080'
        })
      })
    .pipe(
      map(response => {
        const token = response.token;
        console.log(response.token);
        this.setAuthToken(token as string);
        return response;
      }),
      catchError(this.handlerError)
    );


  setAuthToken(token: string): void {
    localStorage.setItem(this.API_TOKEN, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.API_TOKEN);
  }

  // Add other HTTP methods as needed (e.g., put, delete, etc.)
  createAuthorizationHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ' Access-Control-Allow-Origin': 'http://localhost:8080',
        Authorization: `Bearer ${token}`
      })
    };
    const isTokenExpired = this.isAuthenticated();
    if (!isTokenExpired) {
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`)
    }
    return httpOptions.headers;
  }

  // valid token
  isTokenExpired$ = (token: string | null) => <Observable<boolean>>
    this.http.get<boolean>(`${this.baseUrl}/auth/isTokenValid/${token}`,
      {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "http://localhost:8080"
        })
      })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );

  tokenValid(token: string | null): boolean {
    this.isTokenExpired$(token).pipe(
      map(response => {
        console.log("This token its expired")
        this.tokenValid$.next(response);
        tap(console.log)
      }),
      catchError((error: string) => {
        return of(error)
      })
    )
    return this.tokenValid$.value;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if ((token === null) && (!this.tokenValid$.value)) {
      return false;
    }
    return true;
  }

  logout$ = <Observable<string>>
    this.http.post<string>(`http://localhost:8080/logout`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${localStorage.getItem('API_TOKEN')}`,
        "Access-Control-Allow-Origin": "http://localhost:8080"
      })
    }).pipe(
      tap(console.log)
    )
  logout(): void {
    this.isLoggedIn = false;
  }


  handlerError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => "error :" + error.status)
  }
}
