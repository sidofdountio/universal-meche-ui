import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnabarService } from 'src/app/service/snabar.service';
import { AuthService } from '../auth.service';
import { RegisterRequest } from 'src/app/model/register-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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
    this.authService.register$(this.registerForm.value as RegisterRequest)
      .subscribe(
        (response => {
          this.snacbarService.openSnackBar("Nouveau compte cree avec success", "fermer");
          this.router.navigate(['/login'])
        }),
        (() => {
          this.snacbarService.openSnackBarError("Une erreur est survenu pendant la creation du compte", "Close");
        })
      )
  }

  
}
