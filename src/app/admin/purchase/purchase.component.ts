import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource } from '@angular/material/table';

import { Product } from 'src/app/model/product';
import { DialogService } from 'src/app/service/dialog.service';
import { ProductService } from 'src/app/service/product.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { Purchase } from 'src/app/model/purchase';
import { EditPurchaseComponent } from './edit-purchase/edit-purchase.component';
import { DataState } from 'src/app/model/enume/data-state';
import { BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, AfterViewInit, OnDestroy {
  appState = new BehaviorSubject<DataState>(DataState.LOADING_STATE);
  appState$ = this.appState.asObservable();
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  purchases:Purchase[]=[];

  favoriteSeason: string = "Moi";
  purchaseBy: string = "Moi";
  filtre: string[] = ['Tout', 'Moi'];
  products: Product[] = [];
  dataSource = new MatTableDataSource<Purchase>([]);
  displayedColumns: string[] = ['id','purchaseAt','product','price','salePrice','quantity','amount'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.onGetProduct();
    this.onGetPurchase();
  }

  
  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService,
    private purchaseService: PurcharseService) {
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private onGetPurchase() {
    this.appState.next(DataState.LOADING_STATE);
    this.purchaseService.getPurchase().subscribe(
      (response) => {
        // this.dataSource = new MatTableDataSource(response);
        this.dataSource.data = response;
        this.snacbarService.openSnackBarSuccess("Liste des achats Afichees", "Fermer");
        this.appState.next(DataState.LOADED_STATE);
      },
      () => {
        this.snacbarService.openSnackBarError("Une Erreure est survenue.\n Veillez Ressayer", "fermer");
        this.appState.next(DataState.ERROR_STATE);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private onGetProduct() {
    this.state = DataState.LOADING_STATE;
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.snacbarService.openSnackBar("Produit Affiche", "Fermer");
        this.state = DataState.LOADED_STATE;
      },
      () => {
        this.snacbarService.openSnackBarError("Une Erreure est survenue.\n Veillez Ressayer", "close");
        this.state = DataState.ERROR_STATE;
      });
  }

  filterByMonthOrAll(filter: string) {
    this.purchaseBy = filter;
    console.log("Fitre %s", this.purchaseBy);
  }


  buyNewProduct(product: Product) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;
    const dialogRef = this.dialog.open(AddPurchaseComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response) => {
          console.log(response);
          this.purchaseNewProduct(response);
        });
  }

  purchaseNewProduct(purchaseToAdd: Purchase) {
    this.purchaseService.addPurchase(purchaseToAdd)
      .subscribe(
        () => {
          
          this.snacbarService.openSnackBarSuccess("Achat Enregistrer", "Fermer");
          this.onGetPurchase();
          this.onGetProduct();
        },
        () => {
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        }
      );
  }

  onEditePurchase(puchaseToUpdate: Purchase) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = puchaseToUpdate;
    const dialogRef = this.dialog.open(EditPurchaseComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response) => {
          this.editePurchase(response);
        });
  }

  private editePurchase(purchase: Purchase) {
    this.purchaseService.editePurchase(purchase).subscribe(
      () => {
        this.snacbarService.openSnackBarSuccess("Achat Modifier", "Fermer");
        this.onGetPurchase();
      },
      () => {
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  onDelete(id: any) {
    this.dialogService.message("Confirmez La Suppression De Cette Vente ?")
    this.dialogService.checkDiscaseValue().subscribe(
      (isAllow) => {
        if (!isAllow) {
          return;
        }
        this.deleteById(id);
        this.dialogService.updateValue();
      }
    )
  }

  private deleteById(id: number) {
    this.purchaseService.delete(id).
      subscribe(
        () => {
          this.snacbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer");
          this.onGetPurchase();
        },
        () => {
          this.snacbarService.openSnackBarError("Erreure De Supprission", "Fermer");
        }
      );
  }

  

  ngOnDestroy(): void {
    this.appState.unsubscribe();
  }


}

