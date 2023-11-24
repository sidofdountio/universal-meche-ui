import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/model/product';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'color', 'action'];
  PRODUCTS: Product[] = [];
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products: Product[] = [{
    id: 1,
    name: 'Queen',
    price: 10,
    salePrice: 13,
    code: 'QU-234',
    color: 'BLACK',
    description: 'decription',
    productCategory: {
      name: 'synthétiques',
      categoryType: {
        name: 'Kanekalon'
      }
    }
  }]


  product: Product = {
    id: 3,
    name: 'demo',
    price: 15,
    salePrice: 23,
    code: '',
    color: '',
    length: 10,
    description: '',
    productCategory: {
      name: '',
      categoryType: {
        name: ''
      }
    }
  };
  productById: any;

  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.dataSource.data = this.products
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewProduct() {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = this.product;
    const dialogRef = this.dialog.open(AddProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToAdd) => {
          console.log(productToAdd);
          // this.addProduct(productToAdd);
        },
        () => {
          console.log("Error due save product");
        })
  }

  addProduct(productToAdd: Product) {
    this.productService.addProduct(productToAdd)
      .subscribe(
        (response: Product) => {
          console.log()
          this.snacbarService.openSnackBarSuccess("Product added successfuly", "close");
          this.onGetProducts();
        },
        () => {
          this.snacbarService.openSnackBarError("Vous Avez Annuler Cette Opperation", "close");

        }
      );
  }

  onGetProducts() {
    this.productService.getProducts().
      subscribe(
        (() => {
        }),
        ((error: HttpErrorResponse) => {
          this.snacbarService.openSnackBarError("Une Error Est Survenue.\n Veillez Ressayer", "close");
          console.log("Error code : %s", error.status);
        })
      )
  }

  // Edite product
  onEdit(id: number) {
    // for (let index = 0; index < this.productToCheck.value.length; index++) {
    //   if (this.productToCheck.value[index].id === id) {
    //     this.productById = this.productToCheck.value[index];
    //   }
    // }
    // matDialog confi
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    this.product.name = "test";
    configDialog.data = this.product;
    // configDialog.data = this.productById;

    // passing matDialogue and config to open 
    const dialogRef = this.dialog.open(UpdateProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToUpdate) => {
          this.onUpdate(productToUpdate);
        })
  }

  // edite product: Method that run api and be called.->
  private onUpdate(prodtuctToUpdate: Product) {
    this.productService.editeProduct(prodtuctToUpdate)
      .subscribe(
        () => {
          this.snacbarService.openSnackBarSuccess("Product edited successfuly", "Fermer");
          this.onGetProducts();
        },
        (error: HttpErrorResponse) => {
          console.log("Error: %s", error.status);
          this.snacbarService.openSnackBarError("Vous Avez Annuler", "Fermer");
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
    this.productService.deleteProduct(productById).
      subscribe(
        () => {
          this.snacbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer")
        },
        () => {
          this.snacbarService.openSnackBarError("Erreure De Supprission", "Fermer");
        }
      );
  }


}
