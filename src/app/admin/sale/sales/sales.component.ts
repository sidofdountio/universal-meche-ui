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
import { TransactionType } from 'src/app/model/enume/transaction-type';
import { DataState } from 'src/app/model/enume/data-state';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  displayedColumns: string[] = ['name', 'price', 'color', 'category', 'action'];
  productDataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) productPaginator!: MatPaginator;
  @ViewChild(MatSort) producSort!: MatSort;

  ELEMENT_DATA: Sale[] = [];
  displayedColumnSale: string[] = ['id', 'product', 'name', 'amount', 'saleStatus', 'action'];
  dataSource!: MatTableDataSource<Sale>;
  @ViewChild(MatPaginator)
  paginatorSale!: MatPaginator;
  @ViewChild(MatSort)
  sortSale!: MatSort;


  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  isSpinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$ = this.isSpinnerSubject.asObservable();
  // List Sale
  sales: Sale[] = [];

  // List Product
  private products: Product[] = [];
  // Product To Sale
  // private product!: Product;
  // Display sale by filter
  favoriteSeason: string = "Moi";
  saleBy: string = "Moi";
  readonly filtre: string[] = ['Tout', 'Moi'];
  readonly SaleStatus = SaleStatus;
  productName: string = "";
  private saleToSave: Sale = {
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
    id: 0,
    quantity: 0,
    amount: 0,
    price: 0,
    createAt: '',
    saleStatus: SaleStatus.PENDING
  };
  private saleToSaves: Sale[] = [];
  item: number = 0;
  checkedSujet = new BehaviorSubject<boolean>(false);
  disableSujet = new BehaviorSubject<boolean>(false);
  isChecked$ = this.checkedSujet.asObservable();
  isDisabled$ = this.disableSujet.asObservable();
  saleDataSujet = new BehaviorSubject<Sale | null>(null);
  checked: boolean = false;
  disabled = false;
  productInSale: Product[] = [];

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
          id: 2,
          name: 'Kanekalon'
        }
      }
    }];

    this.sales = [{
      id: 1,
      product: {
        id: 1,
        name: 'P1',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          name: '',
          categoryType: {
            id: 1,
            name: ''
          }
        }
      },
      customer: {
        id: 1,
        name: 'C1'
      },
      trasaction: {
        amount: 1,
        id: 'TRA-1',
        timestamp: new Date,
        type: TransactionType.SALE
      },
      quantity: 1,
      amount: 1,
      price: 0,
      createAt: new Date(),
      saleStatus: SaleStatus.PENDING
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'P2',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          name: '',
          categoryType: {
            id: 1,
            name: ''
          }
        }
      },
      customer: {
        id: 1,
        name: 'C1'
      },
      trasaction: {
        amount: 1,
        id: 'TRA-1',
        timestamp: new Date,
        type: TransactionType.SALE
      },
      quantity: 1,
      amount: 1,
      price: 0,
      createAt: '',
      saleStatus: SaleStatus.PENDING
    },
    {
      id: 3,
      product: {
        id: 2,
        name: 'p4',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          id: 2,
          name: '',
          categoryType: {
            id: 2,
            name: ''
          }
        }
      },
      customer: {
        id: 2,
        name: 'demo'
      },
      trasaction: {
        amount: 1,
        id: 'TRA-2',
        timestamp: new Date,
        type: TransactionType.SALE
      },
      quantity: 2,
      amount: 0,
      price: 2,
      createAt: '',
      saleStatus: SaleStatus.PAID
    }];
    this.productDataSource.data = this.products;

    
    for (const sale of this.sales) {
      if (sale.trasaction?.id) {
        this.productInSale.push(sale.product);
      }
    }
    this.onGetSales();

  
  
  }

  ngAfterViewInit() {
    this.productDataSource.paginator = this.productPaginator;
    this.productDataSource.sort = this.producSort;
    this.dataSource.paginator = this.paginatorSale;
    this.dataSource.sort = this.sortSale;
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  /** Get Product */
  getProducts() {
    this.productService.getProducts().subscribe(
      () => {
        this.snacbarService.openSnackBar("Product Loading", "Fermer");
      },
      () => {
        this.snacbarService.openSnackBar("Error Due Loading", "Fermer");
      }
    );
  }

  /** Get Sale */
  getSale(saleId: number): Sale | null {
    this.saleService.getSale(saleId).subscribe(
      (response) => {
        this.saleDataSujet.next(response);
        this.snacbarService.openSnackBar("Sale Loading", "Fermer");
      },
      () => {
        this.snacbarService.openSnackBar("Error Due Loading", "Fermer");
      }
    )
    return this.saleDataSujet.value;
  }

  onGetSales(): void {
    this.state = DataState.LOADING_STATE;
      this.saleService.getSales().subscribe(
  
        (response: Sale[]) => {
          
          this.dataSource = new MatTableDataSource(response);
          this.state = DataState.LOADED_STATE;
          this.snacbarService.openSnackBar("Une Erreure Est Survenue", "Fermer");
        },
        (error: HttpErrorResponse) => {
          this.state = DataState.ERROR_STATE;
          this.snacbarService.openSnackBar("Une Erreure Est Survenue", "Fermer");
          console.log("Error code : %s", error.status);
        }
      )
    }

  /** Filter table  */
  filterByMonthOrAll(filter: string) {
    this.saleBy = filter;
    console.log("Fitre %s", this.saleBy);
    this.snacbarService.openSnackBar(`Vous Avez Choisir Le Filtrer ${this.saleBy}`, "Fermer")
  }



  /** Start sale product here
   * First Get product by id when they click on button */
  saleNewProduct(productId: number) {
    let product;
    // Firt: Fecth product By Id
    for (const productItem of this.products) {
      if (productItem.id === productId) {
        this.productName = productItem.name;
        product = productItem;
      }
    }
    // MatDialog configuration.
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;
    const dialogRef = this.dialog.open(AddSaleComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (productSaleRquest: SaleRequest) => {
          console.log(productSaleRquest);
          // Call ProcessToSave. 
          this.processToSaveSale(productSaleRquest);
        });
  }

  // This Method map with the output afterClosed method of saleNewSale provide.
  private processToSaveSale(saleRequest: SaleRequest) {
    const date = new Date();
    const quantity = saleRequest.quantity;
    const price = saleRequest.price;
    const amount = Math.imul(quantity, price);
    let id = +1;
    this.saleToSave = {
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
      id: id,
      quantity: saleRequest.quantity,
      amount: amount,
      price: saleRequest.price,
      createAt: date,
      saleStatus: SaleStatus.PENDING
    };
    this.saleToSaves.push(this.saleToSave);
    this.item = this.saleToSaves.length;
    this.snacbarService.openSnackBar("Produit Ajoute", "Fermer");
  }

  // Trigger Event when button it's click.
  onSaveSale() {
    this.isLoadingSubject.next(true);
    setTimeout(() => {
      console.log(this.saleToSaves);
      this.isLoadingSubject.next(false);
    }, 5000);
    this.isLoadingSubject.next(true);
    // this.saleDataSource.data = this.saleToSaves;
    // this.saveSale(this.saleToSaves);
  }

  /**  This Method will be called on OnsaveSale.
   * Call the API
  */
  private saveSale(sales: Sale[]) {
    this.saleService.addSale(sales)
      .subscribe(
        (response) => {
          console.log()
          this.snacbarService.openSnackBarSuccess("Vente Enregistrer", "Fermer");
          this.clear();
        },
        () => {
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        }
      );
  }

  clear() {
    this.saleToSaves.splice(0);
    this.item = 0;
    this.snacbarService.openSnackBar("Produit Videz", "Fermer");
  }

  private sale(id: number) {
    this.saleService.getSale(id).subscribe(
      (response) => console.log(response),
      () => {
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  changeSaleStatus(sale: Sale) {

    const saleById = this.getSale(sale.id);
    if (saleById?.saleStatus === SaleStatus.PAID) {
      this.snacbarService.openSnackBar("Cette Vente est Deja Valide", "Fermer");
      return;
    }
    if (saleById?.saleStatus === SaleStatus.PENDING) {
      this.dialogService.message("Confirmer Vous La Validation De Cette Vente ? \n Rassurez Vous D'avoir Recus L'argent En Caise");
      this.dialogService.checkDiscaseValue().subscribe(
        (confirm) => {
          if (confirm) {
            this.validSale(saleById);
          } else {
            this.snacbarService.openSnackBar("Vous Avez Annuler La Confirmation De Cette Vente", "Fermer");
          }
        }
      )

    }

  }


  private validSale(sale: Sale) {
    this.isSpinnerSubject.next(true);
    this.saleService.validSale(sale).subscribe(
      () => {
        this.isSpinnerSubject.next(false);
        this.snacbarService.openSnackBarSuccess(" Status De La Vente Modifiee", "Fermer");
      },
      () => {
        this.isSpinnerSubject.next(false);
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnDestroy(): void {

  }


}
