import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

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

}
