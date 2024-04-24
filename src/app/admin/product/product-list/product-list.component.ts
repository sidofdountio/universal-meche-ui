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
import { WorkBook, WorkSheet, utils, writeFile } from 'xlsx';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  products: Product[] | any[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'salePrice', 'color', 'lenght', 'code', 'volume','action'];

  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.onGetProducts();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNewProduct() {
    let product: Product = {
      id: undefined,
      name: '',
      price: 0,
      salePrice: 0,
      code: '',
      color: '',
      description: '',
      length: 0,
      productCategory: {
        id: undefined,
        name: ''
      },
      volume: ''
    }
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;
    const dialogRef = this.dialog.open(AddProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productToAdd) => {
          this.addProduct(productToAdd);
        },
        () => {
          console.log("Error due save product");
        })
  }

  addProduct(productToAdd: Product) {
    this.productService.addProduct(productToAdd)
      .subscribe(
        () => {
          this.snacbarService.openSnackBarSuccess("Produit Ajoutee", "close");
          this.onGetProducts();
        },
        () => {
          this.snacbarService.openSnackBarError("Une erreur est suvenue", "close");
        }
      );
  }

  onGetProducts() {
    this.productService.getProducts().
      subscribe(
        (response) => {
          this.dataSource.data = response;
          this.products = response;
          this.snacbarService.openSnackBarSuccess("Produit Affichee", "Fermer");
        },
        ((error: HttpErrorResponse) => {
          this.snacbarService.openSnackBarError("Une Erreure est survenue.\n Veillez Ressayer", "Fermer");
          console.log("Error code : %s", error.status);
        })
      )
  }

  // Edite product
  onEdit(product: Product) {
    // matDialog confi
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;

    // passing matDialogue and config to open 
    const dialogRef = this.dialog.open(UpdateProductComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response) => {
          console.log(response);
          this.onUpdateProduct(response);
        })
  }

  // edite product: Method that run api and be called.->
  private onUpdateProduct(prodtuctToUpdate: Product) {
    this.productService.editeProduct(prodtuctToUpdate)
      .subscribe(
        () => {
          this.snacbarService.openSnackBarSuccess("Produit Modifie Avec Success", "Fermer");
          this.onGetProducts();
        },
        (error: HttpErrorResponse) => {
          console.log("Error: %s", error.status);
          this.snacbarService.openSnackBarError("Vous Avez Annuler", "Fermer");
        }
      )
  }

  onDelete(productById: number) {
    this.dialogService.message("Confirmez Vous La Suppression De Ce Produit ?")
    this.dialogService.checkDiscaseValue().subscribe(
      (allow) => {
        if (!allow) {
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
          this.snacbarService.openSnackBarSuccess("Suppression Effectuer Avec Success", "Fermer");
          this.onGetProducts();
        },
        () => {
          this.snacbarService.openSnackBarError("Erreure De Supprission", "Fermer");
        }
      );
  }

  printReportProduct() {
    this.export();
  }

  export(): void {
    /* generate worksheet */
    const ws: WorkSheet = utils.json_to_sheet(this.products);
    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    writeFile(wb, "liste-produits.xlsx");
  }

}
