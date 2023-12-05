import { Injectable } from '@angular/core';
import { Purchase } from '../model/purchase';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurcharseService {

  private readonly URL = environment.URL;

  constructor(private http: HttpClient, private auth: AuthService) { }

  getPurchase(): Observable<Purchase[]> {
    return this.http.get<Purchase[]> (`${this.URL}/purchase`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getPurchasePerMonth(): Observable<Purchase[]> {
    return this.http.get<Purchase[]> (`${this.URL}/purchase/month`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addPurchase(purchaseToAdd: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`${this.URL}/purchase`, purchaseToAdd,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    );
  }

  editePurchase(puchaseToUpdate: Purchase) {
    return this.http.put<Purchase>(`${this.URL}/purchase`, puchaseToUpdate,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  delete(id: number) {
    return this.http.delete(`${this.URL}/purchase/${id}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

}
