import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/service/dialog.service';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { AddSaleComponent } from '../add-sale/add-sale.component';
import { Sale } from 'src/app/model/sale';
import { Product } from 'src/app/model/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SaleStatus } from 'src/app/model/enume/sale-status';
import { SaleRequest } from 'src/app/model/sale-request';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'price', 'color', 'category', 'action'];
  productDataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) productPaginator!: MatPaginator;
  @ViewChild(MatSort) producSort!: MatSort;

  displayedSaleColumns: string[] = ['product', 'createAt', 'name', 'quantity', 'amount', 'saleStatus'];
  saleDataSource = new MatTableDataSource<Sale>([]);
  @ViewChild(MatPaginator) salePaginator!: MatPaginator;
  @ViewChild(MatSort) saleSort!: MatSort;
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  // List Sale
  sales: Sale[] = [
    {
      createAt: new Date(),
      customer: {
        id: 1,
        name: "sidof"
      },
      product: {
        id: 1,
        name: '',
        price: 1,
        salePrice: 2,
        code: '',
        color: '',
        description: '',
        productCategory: {
          name: '',
          categoryType: {
            name: ''
          }
        }
      },
      price: 3,
      quantity: 2,
      amount: 3.00,
      saleStatus: SaleStatus.PENDING,

    }
  ];
  // List Product
  private products: Product[] = [];

  // Product To Sale
  // private product!: Product;
  // Display sale by filter
  favoriteSeason: string = "Moi";
  purchaseBy: string = "Moi";
  readonly filtre: string[] = ['Tout', 'Moi'];
  readonly saleStatus = SaleStatus;
  productName: string = "";
  private saleToSave: Sale ={
    product: {
      id: 1,
      name: '',
      price: 0,
      salePrice: 0,
      code: '',
      color: '',
      description: '',
      productCategory: {
        name: '',
        categoryType: {
          name: ''
        }
      }
    },
    customer: {
      id: 1,
      name: ''
    },
    quantity: 0,
    amount: 0,
    price: 0,
    createAt: '',
    saleStatus: this.saleStatus.PENDING
  };
  private saleToSaves:Sale[]=[];
  item: number = 0;

  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService,
    private saleService: SaleService) {

  }

  ngOnInit(): void {
    // fetch product
    this.getProducts();
    this.products = [{
      id: 1,
      name: 'Queen',
      price: 10,
      salePrice: 12,
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
    this.productDataSource.data = this.products;
    this.saleDataSource.data = this.sales;
  }

  // 
  getProducts() {
    this.productService.getProducts().subscribe(
      () => {

      },
      () => {
        this.snacbarService.openSnackBar("Error Due Loading","Fermer");
      }
    )
  }

  filterByMonthOrAll(filter: string) {
    this.purchaseBy = filter;
    console.log("Fitre %s", this.purchaseBy);
    this.snacbarService.openSnackBar(`Vous Avez Choisir De Filtrer Par ${this.purchaseBy}`, "Fermer")
  }

  ngAfterViewInit() {
    this.productDataSource.paginator = this.productPaginator;
    this.productDataSource.sort = this.producSort;
    this.saleDataSource.paginator = this.salePaginator;
    this.saleDataSource.sort = this.saleSort;
  }

  saleNewProduct(productId: number) {
    let product;
    // Firt: Fecth product By Id
    for (const productItem of this.products) {
      if (productItem.id === productId) {
        this.productName = productItem.name;
        product = productItem;
      }
    }
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;
    const dialogRef = this.dialog.open(AddSaleComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productSaleRquest: SaleRequest) => {
          console.log(productSaleRquest);
          this.processToSaveSale(productSaleRquest);
        });
  }

  private processToSaveSale(saleRequest:SaleRequest){
    const date = new Date();
    const quantity = saleRequest.quantity;
    const price = saleRequest.price;
    const amount = Math.imul(quantity,price);
    this.saleToSave ={
      product: {
        id: saleRequest.product.id,
        name: '',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          name: '',
          categoryType: {
            name: ''
          }
        }
      },
      customer: {
        id: saleRequest.customer.id,
        name: ''
      },
      quantity: saleRequest.quantity,
      amount: amount,
      price: saleRequest.price,
      createAt: date,
      saleStatus: this.saleStatus.PENDING
    };
    this.saleToSaves.push(this.saleToSave);
    this.item = this.saleToSaves.length;
    this.snacbarService.openSnackBar("Produit Ajoute","Fermer");
  }

  onSaveSale(){
    this.isLoadingSubject.next(true);
    setTimeout(()=>{
      console.log(this.saleToSaves);
      this.sales = this.saleToSaves;
      this.isLoadingSubject.next(false);
    },5000);
    this.isLoadingSubject.next(true);
    // this.saveSale(this.saleToSaves);
  }
  

  private saveSale(sales: Sale[]) {
    this.saleService.addSale(sales)
      .subscribe(
        (response) => {
          console.log()
          this.snacbarService.openSnackBarSuccess("Vente Enregistrer", "Fermer");
        },
        () => {
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        }
      );
  }

  clear() {
    this.saleToSaves.splice(0);
    this.item = 0;
    this.snacbarService.openSnackBar("Produit Videz","Fermer");
  }

  private sale(id: number) {
    this.saleService.getSale(id).subscribe(
      (response) => console.log(response),
      () => {
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }


  onValidSale() {
    this.dialogService.message("Confirmez La Suppression De Cette Vente ?")
    this.dialogService.checkDiscaseValue().subscribe(
      (isAllow) => {
        if (!isAllow) {
          return;
        }

      }
    )
  }

  private validSale(sales: Sale[]) {
    this.saleService.validSale(sales).subscribe(
      () => {
        this.snacbarService.openSnackBarSuccess(" Statut De La Vente Modifiee", "Fermer");
      },
      () => {
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }


  ngOnDestroy(): void {

  }


}
