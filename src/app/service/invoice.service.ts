import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Sale } from '../model/sale';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  readonly URL = environment.URL;
  constructor(private http: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL}/invoice`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }





  getInvoiceByInvoiceNumber(invoiceNumber: string): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.URL}/invoice/${invoiceNumber}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveInvoice(invoice: Invoice[]): Observable<Invoice[]> {
    return this.http.post<Invoice[]>(`${this.URL}/invoice`, invoice).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getInvoiceByMonthAndYear(month: any, year: any): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.URL}/invoice/month/${month}/${year}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getInvoiceByDayAndMoth(day: number, month: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.URL}/invoice/${day}/${month}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  generateInvoiceId(prefix: string): string {
    const uniqueNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    const invoiceId = `${prefix}-${uniqueNumber.toString().padStart(6, '0')}`; // Combine prefix and unique number
    return invoiceId;
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
