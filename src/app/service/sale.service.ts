import { Injectable } from '@angular/core';
import { Sale } from '../model/sale';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly API: string = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService) { }


  validSale(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.API}/sale/validSale`, sale,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.API}/sale/${id}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleByMonthAndYear(month:any,year:any): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/month/${month}/${year}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleByDayAndMoth(day:number,month:string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/${day}/${month}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleMonth(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/month`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleDay(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/day`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addSale(sales: Sale[]): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.API}/sale`, sales,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
