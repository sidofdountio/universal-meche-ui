import { Injectable } from '@angular/core';
import { Custormer } from '../model/custorme';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustormeService {

  private readonly URL = "customer";
  constructor(private http: HttpClient) { }

  getCustormes(): Observable<Custormer[]> {
    return this.http.get<Custormer[]>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getCustorme(id:number): Observable<Custormer> {
    return this.http.get<Custormer>(`${this.URL}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addCustomer(custormeToAdd: Custormer): Observable<Custormer> {
    return this.http.post<Custormer>(`${this.URL}/addCustorme`, custormeToAdd)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }


  deleteCustorme(customerId: number) {
    return this.http.delete(`${this.URL}/delete/${customerId}`)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
