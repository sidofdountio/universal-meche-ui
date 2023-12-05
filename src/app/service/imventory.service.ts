import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventory } from '../model/inventory';
import { Observable } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private readonly URL = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService) { }

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.URL}/inventory`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error:HttpErrorResponse):Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }  
      
}
