import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../model/product';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  readonly URL = environment.URL;
  constructor(private http: HttpClient){}

  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/product`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  getProduct(id:number):Observable<Product> {
    return this.http.get<Product>(`${this.URL}/product/${id}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addProduct(prodtuctToAdd: Product):Observable<Product > {
     return this.http.post<Product>(`${this.URL}/product`,prodtuctToAdd).pipe(
      tap(console.log),
      catchError(this.handlerError)
     );
  }

  editeProduct(productToUpdate: Product) {
    return this.http.put<Product>(`${this.URL}/product`, productToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  deleteProduct(productById: number):Observable<void> {
    return this.http.delete(`${this.URL}/product/${productById}`)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
}
