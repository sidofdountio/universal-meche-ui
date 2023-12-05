import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sale } from 'src/app/model/sale';
import { DialogService } from 'src/app/service/dialog.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { Chart } from 'chart.js/auto';
import { SaleStatus } from 'src/app/model/enume/sale-status';
import { SaleService } from 'src/app/service/sale.service';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Inventory } from 'src/app/model/inventory';
import { InventoryService } from 'src/app/service/imventory.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  readonly SaleStatus = SaleStatus;
  productName: string[] = [];
  productQuantity: number[] = [];
  stockData: Inventory[] = [];
  progresseBarPurchse:number = 0;

  sells: Sale[] = [];
  displayedColumns: string[] = ['product', 'createAt', 'name', 'amount', 'saleStatus'];
  dataSource = new MatTableDataSource<Sale>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  value: number = 10;
  sellAmount: number = 10;
  // Montant vendue
  purchaseAmount: number = 0;
  purchaseAmountSize: number = 0;
  // Autre charge: frais de luimiere, achat d'un material
  miscellaneousLoad: number = 5;
  // Gain possible
  receiveAmount: number = 20;
  // facture annuler;
  invoiceCancel: number = 1;


  data: number[] = [];

  private breakpointObserver = inject(BreakpointObserver);
  totalAmountSalePerDay: number = 0;
  totalItemSalePerDay: number = 0;
  totalAmountSalePerDayProgresseBar: number = 0;
  
  totalSalePerDay: number = 0;
  currentDate!: string|number|Date;
  purchaseAmountProgressBar: number = 0;
  constructor( 
    private purchaseService: PurcharseService,
    private router: Router, 
    private dialogService: DialogService, 
    private snacbarService: SnabarService,
    private saleService:SaleService,
    private invoiceService:InvoiceService,
    private inventoryService:InventoryService) { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.stockChart();
    this.getPurchasePerMonth();
    this. getSaleByDay();
    this.saleService.getSales().subscribe(
      (response)=>{
        this.dataSource.data = response;
      }
    )
    
   
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onAlert() {
    this.snacbarService.openSnackBarSuccess("hello", "close");
  }

  onDialog() {
    this.dialogService.message("was clicked")
  }

  getSaleByDay() {
    this.saleService.getSaleDay().subscribe(
      (response) => {
        this.totalSalePerDay = response.length;
        this.totalItemSalePerDay = response.length;
        for (const item of response) {
          this.totalAmountSalePerDay += item.amount;
        }
        this.totalAmountSalePerDayProgresseBar = this.totalAmountSalePerDay / 500000;
      },() => {
      }
    )
  }

  getPurchasePerMonth() {
    this.purchaseService.getPurchasePerMonth().subscribe(
      (response) => {
        this.purchaseAmountSize = response.length;
        for (let purchase of response) {
          this.purchaseAmount += purchase.amount;
        }

          

       
        this.progresseBarPurchse = this.purchaseAmount/2000000;
      }
    )
  }


  stockChart() {
    this.inventoryService.getInventories().subscribe(
      (response: Inventory[]) => {
        for (var item of response){
          if(item.up){
            this.productName.push(item.productName);
            this.productQuantity.push(item.newQuantity);   
          }
        }

        stockProductState(this.productName, this.productQuantity);
      },
      (error: HttpErrorResponse) => {
        console.log("error status :  %s", error.status);
      }
    );
  }

}


function stockProductState(productName: string[], productQuantity: number[]) {

  const stock: any = document.getElementById("stock");

  var donutData = {
    labels: productName,
    datasets: [
      {
        data: productQuantity,
        backgroundColor: ['#f56954', '#00a65a', '#00b64a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de', '#d1d6df','#d1d6ed', '#a1d6de',, '#3d7dbc','#f39c47','#f39c18','#11c0ef','#22c0ef','#23c0ef','#33c0ef','#45c0ea','#10c0ew'],
      }
    ]
  }
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  }
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var donutChart = new Chart(stock, {
    type: 'doughnut',
    data: donutData,
    options: donutOptions
  })
}


