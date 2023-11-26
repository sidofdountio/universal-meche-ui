import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { Charge } from '../model/charge';
import { AnotherCharge } from '../model/another-charge';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  readonly URL = "charge";
  constructor(private http: HttpClient) { }

  getCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.URL}/charges`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getCharge(id:number): Observable<Charge> {
    return this.http.get<Charge>(`${this.URL}/${id}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveCharge(charge:Charge): Observable<Charge> {
    return this.http.put<Charge>(`${this.URL}/edit`,charge).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveAnotherCharge(anotherCharge:AnotherCharge): Observable<AnotherCharge> {
    return this.http.put<AnotherCharge>(`${this.URL}/saveAnotherCharge`,anotherCharge).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getAnotherCharge(id:number): Observable<AnotherCharge> {
    return this.http.get<AnotherCharge>(`${this.URL}/another/${id}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
}
