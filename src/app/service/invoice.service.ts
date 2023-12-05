import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Sale } from '../model/sale';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly URL = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL}/invoice`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }


  getInvoiceByInvoiceNumber(invoiceNumber: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL}/invoice/${invoiceNumber}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveInvoice(invoice: Invoice[]): Observable<Invoice[]> {
    return this.http.post<Invoice[]>(`${this.URL}/invoice`, invoice,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getInvoiceByMonthAndYear(month: any, year: any): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.URL}/invoice/month/${month}/${year}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getInvoiceByDayAndMoth(day: number, month: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.URL}/invoice/${day}/${month}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }


  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
