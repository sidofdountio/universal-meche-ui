import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PurcharseService {


  readonly URL = environment.URL;

  constructor(private http: HttpClient) { }

  getPurchase(): Observable<Purchase[]> {
    return this.http.get<Purchase[]> (`${this.URL}/purchase`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getPurchasePerMonth(): Observable<Purchase[]> {
    return this.http.get<Purchase[]> (`${this.URL}/purchase/month`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addPurchase(purchaseToAdd: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.URL}/purchase`, purchaseToAdd).pipe(
      tap(console.log),
      catchError(this.handlerError)
    );
  }

  editePurchase(puchaseToUpdate: Purchase) {
    return this.http.put<Purchase>(`${this.URL}/purchase`, puchaseToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/purchase/${id}`)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
