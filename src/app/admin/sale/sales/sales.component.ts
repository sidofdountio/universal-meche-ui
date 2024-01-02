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
import { FormBuilder } from '@angular/forms';
import { PaymentMethod } from 'src/app/model/paymentMethod';
import { ValidSaleComponent } from '../valid-sale/valid-sale.component';
import { WorkSheet, utils, WorkBook, writeFile } from 'xlsx';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, AfterViewInit, OnDestroy {
  appState = new BehaviorSubject<DataState>(DataState.LOADING_STATE);
  appState$ = this.appState.asObservable();
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;

  private saleToSaves: Sale[] = [];
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  spinnerSubject = new BehaviorSubject<boolean>(false);
  spinner$ = this.spinnerSubject.asObservable();
  spinnerSaleStatusSubject = new BehaviorSubject<boolean>(false);
  spinnerSaleStatusta$ = this.spinnerSaleStatusSubject.asObservable();

  displayedColumns: string[] = ['id', 'createAt', 'month','paymentType', 'product', 'name', 'quantity','price','amount', 'status', 'action'];
  dataSource = new MatTableDataSource<Sale>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // List Product
  products: Product[] = [];
  readonly paymentMethods: PaymentMethod[] = [
    {
      type: "LIQUIDE"
    },
    {
      type: "MTN MONEY"
    },
    {
      type: "ORANGE MONEY"
    }
  ];
  paymentForm = this.fb.group({
    type: this.fb.group({
      value: [""]
    })
  });
  paymentSelected: boolean = false;
  private paymentTypeValue = new BehaviorSubject<string>("LIQUIDE");
  readonly status = SaleStatus;

  item: number = 0;
  checkedSujet = new BehaviorSubject<boolean>(false);
  disableSujet = new BehaviorSubject<boolean>(false);
  isChecked$ = this.checkedSujet.asObservable();
  isDisabled$ = this.disableSujet.asObservable();
  saleDataSujet = new BehaviorSubject<Sale | null>(null);
  productInSale: Product[] = [];


  constructor(private dialog: MatDialog, private productService: ProductService,
    private snacbarService: SnabarService, private dialogService: DialogService,
    private saleService: SaleService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // fetch product
    this.getProducts();
    this.onGetSales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Get Product */
  getProducts() {
    this.appState.next(DataState.LOADING_STATE);
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.snacbarService.openSnackBarSuccess("Produit Affiche", "Fermer");
        this.appState.next(DataState.LOADED_STATE);
      },
      () => {
        this.appState.next(DataState.ERROR_STATE);
        this.snacbarService.openSnackBarError("Error Due Loading", "Fermer");
      }
    );
  }

  onGetSales(): void {
    this.state = DataState.LOADING_STATE;
    this.saleService.getSales().subscribe(
      (response: Sale[]) => {
        this.dataSource.data = response;
        this.state = DataState.LOADED_STATE;
        this.snacbarService.openSnackBarSuccess("Vente Affichee", "Fermer");
      },
      () => {
        this.state = DataState.ERROR_STATE;
        this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }
  // select payment type 
  onPaymentMethod(event: any) {
    this.paymentSelected = true;
    this.paymentTypeValue.next(event);
    this.getPaymentType(event);
    
  }
  /** Start sale product here
   * First Get product by id when they click on button */
  saleNewProduct(product: Product) {
    // MatDialog configuration.
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = product;
    const dialogRef = this.dialog.open(AddSaleComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response: SaleRequest) => {
          // Call ProcessToSave. 
          this.processToSaveSale(response);
        },()=>{
          
        });
  }

  private getPaymentType(type: string): string {
    return type;
  }

  // This Method map with the output afterClosed method of saleNewSale provide.
  private processToSaveSale(saleRequest: SaleRequest) {

    let saleToSave: Sale = {
      product: {
        id: 1,
        length: 0,
        name: '',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          id: undefined,
          name: ''
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
      status: SaleStatus.PENDING,
      trasaction: {
        id: undefined,
        amount: 0,
        timestamp: '',
        type: TransactionType.SALE
      },
      day: 0,
      month: undefined,
      year: undefined,
      paymentType: "LIQUIDE"
    };
    const quantity = saleRequest.quantity;
    const price = saleRequest.price;
    const amount = Math.imul(quantity, price);
    saleToSave = {
      product: {
        id: saleRequest.product.id,
        length: 0,
        name: saleRequest.product.name,
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          id: undefined,
          name: ''
        }
      },
      customer: {
        id: saleRequest.customer.id,
        name: ''
      },
      trasaction: {
        id: undefined,
        amount: 0,
        timestamp: '',
        type: TransactionType.SALE
      },
      status: SaleStatus.PENDING,
      id: undefined,
      quantity: saleRequest.quantity,
      amount: amount,
      price: saleRequest.price,
      createAt: '',
      day: 0,
      month: undefined,
      year: undefined,
      paymentType: this.paymentTypeValue.value
    };
    this.saleToSaves.push(saleToSave);
    this.item = this.saleToSaves.length;
    this.snacbarService.openSnackBar("Produit Ajoute", "Fermer");
  }

  // Trigger Event when button it's click.
  onSaveSale() {
    for (let sale of this.saleToSaves) {
      sale.paymentType = this.paymentTypeValue.value;
    }
    this.saveSale(this.saleToSaves);
  }

  private saveSale(sales: Sale[]) {
    this.isLoadingSubject.next(true);
    this.saleService.addSale(sales)
      .subscribe(
        (response) => {
          this.onGetSales();
          this.snacbarService.openSnackBarSuccess("Vente Enregistre", "Fermer");
          this.isLoadingSubject.next(false);
          this.clear();
        },
        () => {
          this.isLoadingSubject.next(false);
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue. Rassurez vous d'avoir achete Ce Produit ou Qu'il soit Encore Disponoble en Stock ", "Fermer");
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
    const alown = false;
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = alown;
    const dialogRef = this.dialog.open(ValidSaleComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response: boolean) => {
          this.validSale(sale, response);
        });
  }

  private validSale(sale: Sale, valid: boolean) {
    if (valid) {
      this.saleService.validSale(sale).subscribe(
        () => {
          this.saleService.validSale(sale);
          this.spinnerSaleStatusSubject.next(false);
          this.onGetSales();
          this.snacbarService.openSnackBarSuccess(" Status De La Vente Modifiee", "Fermer");
        },
        () => {
          this.spinnerSaleStatusSubject.next(false);
          this.snacbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        }
      )
    } else {
      this.snacbarService.openSnackBarError("Vous Avez Annuler Le Processus De Validation De Cette Vente", "Fermer");
      console.log("status 2 %s", valid);
      return;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  printReportSale() {
    this.export();
  }
  export(): void {
    /* generate worksheet */
    const ws: WorkSheet = utils.json_to_sheet(this.dataSource.data);

    /* generate workbook and add the worksheet */
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    writeFile(wb, "liste-des-vente.xlsx");
  }

  ngOnDestroy(): void {
  }
}
