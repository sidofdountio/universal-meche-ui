import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../model/product';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

 
  readonly URL = "";

  constructor(private http: HttpClient){}

  getProduct():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.URL}/products`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }
  // TODO removed type null here
  addProduct(prodtuctToAdd: Product):Observable<Product > {
     return this.http.post<Product>(`${this.URL}/addProduct`,prodtuctToAdd).pipe(
      tap(console.log),
      catchError(this.handlerError)
     );
  }

  editeProduct(productToUpdate: Product) {
    return this.http.put<Product>(`${this.URL}/editProduct`, productToUpdate)
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      );
  }

  deleteProduct(productById: any) {
    return this.http.delete(`${this.URL}/delete`, productById)
      .pipe(
        tap(console.log)
      );
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }

  
}
