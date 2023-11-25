import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurcharseService {


  readonly URL: string = "";

  constructor(private http: HttpClient) { }

  getPurchase(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.URL}/purchases`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addPurchase(purchaseToAdd: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.URL}/addPurchase`, purchaseToAdd).pipe(
      tap(console.log),
      catchError(this.handlerError)
    );
  }

  editePurchase(puchaseToUpdate: Purchase) {
    return this.http.put<Purchase>(`${this.URL}/editPurchase`, puchaseToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  delete(id: any) {
    return this.http.delete(`${this.URL}/delete`, id)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
