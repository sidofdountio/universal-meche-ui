import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../service/dialog.service';
import { SnabarService } from '../service/snabar.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-get-start',
  templateUrl: './get-start.component.html',
  styleUrls: ['./get-start.component.css']
})
export class GetStartComponent implements OnInit,AfterViewInit{
  loadindSuject = new BehaviorSubject<boolean>(true)
  loading$ = this.loadindSuject.asObservable();

  title = 'boutique-meche';

  constructor(private router: Router, private dialogService: DialogService,private snacbarService:SnabarService) { }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.loadindSuject.next(true);
    setTimeout(()=>{
      this.loadindSuject.next(false);
     
    },3000);
  }
  onGo() {
    this.router.navigate(['/login'])
  }

  

}
