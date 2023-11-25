import { Injectable } from '@angular/core';
import { Sale } from '../model/sale';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  readonly API: string = "sale";
  constructor(private http: HttpClient) { }

  validSales(sales: Sale[]): Observable<Sale[]> {
    return this.http.put<Sale[]>(`${this.API}/validSales`, sales)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }
  validSale(sale: Sale): Observable<Sale> {
    return this.http.put<Sale>(`${this.API}/validSale`, sale)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }
  getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.API}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addSale(sales: Sale[]): Observable<Sale[]> {
    return this.http.post<Sale[]>(`${this.API}/addSale`, sales)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }



  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
