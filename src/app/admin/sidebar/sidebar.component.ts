import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  username:string | null = "";

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.username =localStorage.getItem("username");
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  LogOut() {
    this.authService.logout$.subscribe(
      () => {
        localStorage.clear();
        this.router.navigate(["/login"])
      }
    )
  }

}
