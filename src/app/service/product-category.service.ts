import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { ProductCategory } from '../model/product-category';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private readonly URL = environment.URL;
  constructor(private http: HttpClient,
    private auth: AuthService){}


  getProductCategory():Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.URL}/product-category`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveProductCategory(p:ProductCategory):Observable<ProductCategory[]> {
    return this.http.post<ProductCategory>(`${this.URL}/product-category`,p,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  delete(id:number):Observable<void> {
    return this.http.delete<void>(`${this.URL}/product-category/${id}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  private handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  } 
}
