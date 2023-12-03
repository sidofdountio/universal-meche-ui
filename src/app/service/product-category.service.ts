import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private readonly URL = environment.URL;
  constructor(private http: HttpClient){}


  getProductCategory():Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.URL}/product-category`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveProductCategory(p:ProductCategory):Observable<ProductCategory[]> {
    return this.http.post<ProductCategory>(`${this.URL}/product-category`,p).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  delete(id:number):Observable<void> {
    return this.http.delete<void>(`${this.URL}/product-category/${id}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  private handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  } 
}
