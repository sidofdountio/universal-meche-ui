import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../model/supplier';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly URL = "supplier";
  constructor(private http: HttpClient) { }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.URL}`)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addSupplier(supplierToAdd: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.URL}/addSupplier`, supplierToAdd)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }


  deleteSupplier(supplierId: any) {
    return this.http.delete(`${this.URL}/delete`, supplierId)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
