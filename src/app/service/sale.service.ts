import { Injectable } from '@angular/core';
import { Sale } from '../model/sale';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  readonly API: string = environment.URL;
  constructor(private http: HttpClient) { }



  validSale(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.API}/sale/validSale`, sale)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.API}/sale/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleByMonthAndYear(month:any,year:any): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/month/${month}/${year}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleByDayAndMoth(day:number,month:string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/${day}/${month}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleMonth(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/month`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSaleDay(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.API}/sale/day`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addSale(sales: Sale[]): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.API}/sale`, sales)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
