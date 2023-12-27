import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../model/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private readonly URL = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService){}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/product`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getProduct(id:number):Observable<Product> {
    return this.http.get<Product>(`${this.URL}/product/${id}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addProduct(prodtuctToAdd: Product):Observable<Product > {
     return this.http.post<Product>(`${this.URL}/product`,prodtuctToAdd,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
     );
  }

  editeProduct(productToUpdate: Product) {
    return this.http.put<Product>(`${this.URL}/product`, productToUpdate,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  deleteProduct(productById: number):Observable<void> {
    return this.http.delete(`${this.URL}/product/${productById}`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
}
