import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, tap } from 'rxjs';
import { Supplier } from 'src/app/model/supplier';
import { DialogService } from 'src/app/service/dialog.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnDestroy, OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Supplier>([]);
  displayedColumns: string[] = ['address', 'name', 'email', 'phone', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  suppliers: Supplier[] = [];
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  formSupplier = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.minLength(9)]],
    email: ['', Validators.email],
    address: ['', [Validators.required]]
  });

  constructor(private dialogService: DialogService, private fb: FormBuilder, private supplierService: SupplierService, private snackbarService: SnabarService) { }

  ngOnInit(): void {

    this.supplierService.getSupplier().pipe(
      tap(
        (response) => {
          this.dataSource.data = response;
        },
        () => {
          this.snackbarService.openSnackBar("Error Du Loading", "close")
        }
      )
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  onAddNewSupplier() {
    this.isLoadingSubject.next(true);
    this.supplierService.addSupplier(this.formSupplier.value as Supplier).subscribe(
      () => {
        console.log(this.formSupplier.value as Supplier)
        this.isLoadingSubject.next(false);
        this.snackbarService.openSnackBarSuccess("Fournisseur Ajoute", "Fermer")
      },
      () => {
        this.isLoadingSubject.next(false);
        this.snackbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  onDelete(productById: any) {
    this.dialogService.message("Confirmez La Suppression De Ce Produit ?")
    this.dialogService.checkDiscaseValue().subscribe(
      (isAllow) => {
        if (!isAllow) {
          return;
        }
        this.deleteProductById(productById);
        this.dialogService.updateValue();
      }
    )
  }

  private deleteProductById(productById: number) {
    this.supplierService.deleteSupplier(productById).
      subscribe(
        () => {
          this.snackbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer")
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
