import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../model/inventory';
import { Observable } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  readonly URL = "invoice";
  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.URL}/invoices`).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
      
}
