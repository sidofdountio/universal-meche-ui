import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../model/supplier';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private readonly URL = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService) { }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.URL}/supplier`,{ headers: this.auth.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getSupplierById(id:number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.URL}/supplier/${id}`,{ headers: this.auth.createAuthorizationHeaders() })
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  addSupplier(supplierToAdd: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.URL}/supplier`, supplierToAdd,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  deleteSupplier(supplierId: number) {
    return this.http.delete(`${this.URL}/supplier/${supplierId}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
