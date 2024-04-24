import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnabarService } from 'src/app/service/snabar.service';
import { AuthService } from '../auth.service';
import { RegisterRequest } from 'src/app/model/register-request';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    email: this.fb.nonNullable.control("", {
      validators: [Validators.required, Validators.email],
    }),
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router
    , private snacbarService: SnabarService,
    private authService: AuthService) { }

  onRegister() {
    this.isLoading.next(true);
    this.authService.register$(this.registerForm.value as RegisterRequest)
    .subscribe(
      (response => {
        this.isLoading.next(false);
        this.snacbarService.openSnackBar("Nouveau compte cree avec success", "fermer");
        this.router.navigate(['/login'])
      }),
      (() => {
          this.isLoading.next(false);
          this.snacbarService.openSnackBarError("Une erreur est survenu pendant la creation du compte", "Close");
        })
      )
  }

  
}
