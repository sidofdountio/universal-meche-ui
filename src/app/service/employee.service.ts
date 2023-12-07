import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private readonly URL = environment.URL;
  constructor(private http: HttpClient, private auth: AuthService) { }

  employees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.URL}/employee`,{headers: this.auth.createAuthorizationHeaders()})
      .pipe(
        tap(console.log),
        catchError(this.handlerError)
      )
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.URL}/employee/${id}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }


  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.URL}/employee`, employee,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.URL}/employee`, employee,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<Employee>(`${this.URL}/employee/${id}`,{headers: this.auth.createAuthorizationHeaders()}).pipe(
      tap(console.log),
      catchError(this.handlerError)
    )
  }

  handlerError(error: HttpErrorResponse): Observable<never> {
    throw new Error(`An error occured - Error code :${error.status}`);
  }
}
