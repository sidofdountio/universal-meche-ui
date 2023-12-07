import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CategoryType } from '../model/category-type';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryTypeService {

  
  readonly URL = environment.URL;
  constructor(private http: HttpClient){}


  getProductCategoryType():Observable<CategoryType[]> {
    return this.http.get<CategoryType[]>(`${this.URL}/category`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  saveProductCategoryType( categoryType:CategoryType):Observable<CategoryType> {
    return this.http.post<CategoryType>(`${this.URL}/category`,categoryType).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  delete( id:number):Observable<unknown> {
    return this.http.delete<unknown>(`${this.URL}/category/${id}`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  } 
}
