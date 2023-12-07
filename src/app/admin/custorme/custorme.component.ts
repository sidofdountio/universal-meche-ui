import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, tap } from 'rxjs';
import { Custormer } from 'src/app/model/custorme';
import { CustormeService } from 'src/app/service/custorme.service';
import { DialogService } from 'src/app/service/dialog.service';
import { SnabarService } from 'src/app/service/snabar.service';

@Component({
  selector: 'app-custorme',
  templateUrl: './custorme.component.html',
  styleUrls: ['./custorme.component.css']
})
export class CustormeComponent implements OnDestroy, OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Custormer>([]);
  displayedColumns: string[] = ['address', 'name', 'email', 'phone', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  customers: Custormer[] = [];
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  formCustormer = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.maxLength(9)]],
    email: ['', Validators.email],
    address: ['', [Validators.required]]
  });

  constructor(private dialogService: DialogService, private fb: FormBuilder, private custormeService: CustormeService, private snackbarService: SnabarService) { }

  ngOnInit(): void {
    this.onGetCustomer();
  }

  private onGetCustomer() {
    this.custormeService.getCustormes().subscribe(
      
        (response) => {
          this.dataSource.data = response;
          console.log(response);
        },
        () => {
          this.snackbarService.openSnackBarError("Une Erreure Est Survenue.", "Fermer");
        }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onAddNewCustomer() {
    this.isLoadingSubject.next(true);
    this.custormeService.addCustomer(this.formCustormer.value as Custormer).subscribe(
      () => {
        console.log(this.formCustormer.value as Custormer)
        this.isLoadingSubject.next(false);
        this.snackbarService.openSnackBarSuccess("Nouveau Client Ajoute", "Fermer");
        this.onGetCustomer();
      },
      () => {
        this.isLoadingSubject.next(false);
        this.snackbarService.openSnackBarError("Une Erreure Est Survenue. Ne pas Utiliser Le Meme Numero De Telephne", "Fermer");
      }
    )
  }

  onDelete(id: number) {
    this.dialogService.message("Confirmez La Suppression De Ce Client ?")
    this.dialogService.checkDiscaseValue().subscribe(
      (isAllow) => {
        if (!isAllow) {
          return;
        }
        this.deleteCustumerById(id);
        this.dialogService.updateValue();
       
      }
    )
  }

  private deleteCustumerById(id: number) {
    this.custormeService.deleteCustorme(id).
      subscribe(
        () => {
          this.snackbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer");
          this.onGetCustomer();
        },
        () => {
          this.snackbarService.openSnackBarError("Erreure De Supprission", "Fermer");
        }
      );
  }

  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
