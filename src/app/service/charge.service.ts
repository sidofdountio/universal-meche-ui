import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Charge } from '../model/charge';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  readonly URL = environment.URL;
  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.URL}/charge`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getCharge(id:number): Observable<Charge> {
    return this.http.get<Charge>(`${this.URL}/charge/${id}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveCharge(charge:Charge): Observable<Charge> {
    return this.http.put<Charge>(`${this.URL}/charge`,charge,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
}
