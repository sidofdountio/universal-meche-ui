import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataState } from 'src/app/model/enume/data-state';
import { SaleStatus } from 'src/app/model/enume/sale-status';
import { TransactionType } from 'src/app/model/enume/transaction-type';
import { Invoice } from 'src/app/model/invoice';
import { Product } from 'src/app/model/product';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ProductService } from 'src/app/service/product.service';
import { SnabarService } from 'src/app/service/snabar.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements AfterViewInit, OnInit {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  displayedColumns: string[] = ['invoiceNumber', 'date', 'amount', 'action'];
  dataSource!: MatTableDataSource<Invoice>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  invoices: Invoice[] = [];
  readonly SaleStatus = SaleStatus;;
  productOnInvoice: Product[] = [];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.invoices);
    this.onGetInvoices();
  }

  constructor(private invoiceService: InvoiceService,
    private productService: ProductService,
    private snackbarService: SnabarService, private router: Router) { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onGetInvoices(): void {
    this.state = DataState.LOADING_STATE;
    this.invoiceService.getInvoices().subscribe(

      (response: Invoice[]) => {
        this.dataSource.data = response;
        this.state = DataState.LOADED_STATE;
        this.snackbarService.openSnackBarSuccess("Liste Des Factures Afichee", "Fermer");
      },
      (error: HttpErrorResponse) => {
        this.state = DataState.ERROR_STATE;
        this.snackbarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
        console.log("Error code : %s", error.status);
      }
    )
  }

  onInvoice(invoiceNumber: number) {
    this.router.navigate(["admin/invoice/", invoiceNumber]);
  }

  getInvoiceByInvoiceNumber(invoiceNumber: string) {
    this.invoiceService.getInvoiceByInvoiceNumber(invoiceNumber).subscribe(

    )
  }

  generateExcelFile(): void {
    // Create a workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate the Excel file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, new Date() + 'invoice_sale_list.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
  }


}

