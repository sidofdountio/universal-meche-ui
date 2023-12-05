import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationRequest } from 'src/app/model/authentication-request';
import { BehaviorSubject } from 'rxjs';
import { SnabarService } from 'src/app/service/snabar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  form = this.fb.group({
    email: this.fb.nonNullable.control("", {
      validators: [Validators.required, Validators.email],
    }),
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  constructor(private router: Router, 
    private snackbarServie:SnabarService,
    private authService: AuthService,private fb: FormBuilder) { }

  

  onLog() {
    this.authService.login().subscribe(
      (() => {
        if (this.authService.isLoggedIn) {
          this.router.navigate(['/admin']);
        }
      })
    )

  }

  logout() {
    this.authService.logout();
  }

  onLogIn(): void {
    this.isLoading.next(true);
    this.authService.login$(this.form.value as AuthenticationRequest)
      .subscribe(
        (response => {
          this.isLoading.next(false);
          this.router.navigate(['/admin'])
        }),
        (() => {
          this.isLoading.next(false);
          this.snackbarServie.openSnackBarError("Email ou Mot De Passe Incorrecte".toUpperCase(), "X")
        })
      )
  }
  
  onLogout() {
    this.authService.logout$;
  }

}
