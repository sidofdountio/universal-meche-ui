import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { DialogService } from 'src/app/service/dialog.service';
import { ProductService } from 'src/app/service/product.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { Purchase } from 'src/app/model/purchase';
import { EditPurchaseComponent } from './edit-purchase/edit-purchase.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'price', 'color', 'category', 'action'];
  PRODUCTS: Product[] = [];
  productDataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) productPaginator!: MatPaginator;
  @ViewChild(MatSort) producSort!: MatSort;
  products: Product[] = [{
    name: 'Queen',
    price: 10,
    code: 'QU-234',
    color: 'BLACK',
    description: 'decription',
    productCategory: {
      name: 'synthétiques',
      categoryType: {
        name: 'Kanekalon'
      }
    }
  }];

  product: Product = {
    id: 3,
    name: 'demo',
    price: 15,
    code: '',
    color: '',
    length: 10,
    description: '',
    productCategory: {
      name: 'Syntehetique',
      categoryType: {
        name: ''
      }
    }
  };
  purchaseToEdite: Purchase = {
    price: 0,
    quantity: 0,
    amount: 0,
    purchaseAt: '',
    supplier: {
      name: '',
      address: '',
      phone: ''
    },
    product: {
      name: '',
      price: 0,
      code: '',
      color: '',
      description: '',
      productCategory: {
        name: '',
        categoryType: {
          name: ''
        }
      }
    }
  };

  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService,
    private purchaseService: PurcharseService) { }

  ngOnInit(): void {
    this.productDataSource.data = this.products;
  }

  ngAfterViewInit() {
    this.productDataSource.paginator = this.productPaginator;
    this.productDataSource.sort = this.producSort;
  }

  buyNewProduct(productId: number) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = this.product;
    const dialogRef = this.dialog.open(AddPurchaseComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToAdd) => {
          console.log(productToAdd);
          // this.addProduct(productToAdd);
        });
  }

  purchaseNewProduct(purchaseToAdd: Purchase) {
    this.purchaseService.addPurchase(purchaseToAdd)
      .subscribe(
        (response) => {
          console.log()
          this.snacbarService.openSnackBarSuccess("Achat Enregistrer", "Fermer");
        },
        () => {
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        }
      );
  }

  onEditePurchase(id: number) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;

    configDialog.data = this.purchaseToEdite;
    const dialogRef = this.dialog.open(EditPurchaseComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response) => {
          console.log(response);
          // this.addProduct(productToAdd);
        });
  }

  edite(purchase: Purchase) {
    this.purchaseService.editePurchase(purchase).subscribe(
      () => {
        this.snacbarService.openSnackBarSuccess("Achat Modifier", "Fermer");
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
          this.snacbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer")
        },
        () => {
          this.snacbarService.openSnackBarError("Erreure De Supprission", "Fermer");
        }
      );
  }

  ngOnDestroy(): void {

  }


}
