import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { PaymentStatus } from 'src/app/model/enume/payment-status';
import { Sell } from 'src/app/model/sell';
import { DialogService } from 'src/app/service/dialog.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  productName: string[] = ["bresiline","peruque","greffe"];
  productQuantity: number[] = [10,13,37];
  sells: Sell[] = [
    {
      createAt: new Date(),
      customer: {
        name: "sidof"
      },
      invoice: {
        invoiceId: "INV-9W9W9"
      },
      payment: {
        amount: 90,
        paymentStatus: PaymentStatus.PENDING
      }
    }];
  displayedColumns: string[] = ['invoiceId', 'createAt', 'name', 'amount', 'paymentStatus'];
  dataSource = new MatTableDataSource<Sell>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  value: number = 10;
  sellAmount: number = 10;
  // Montant vendue
  purchaseAmount: number = 10;
  // Autre charge: frais de luimiere, achat d'un material
  miscellaneousLoad:number = 5;
  // Gain possible
  receiveAmount:number = 20;
  // facture annuler;
  invoiceCancel:number =1;

  private breakpointObserver = inject(BreakpointObserver);
  paymentStatus = PaymentStatus;


  constructor(private router: Router, private dialogService: DialogService, private snacbarService: SnabarService) { }

  ngOnInit(): void {
    this.dataSource.data = this.sells;
    stockProductState(this.productName,this.productQuantity);
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

}


function stockProductState(productName: string[], productQuantity: number[]) {

  const stock: any = document.getElementById("stock");

  var donutData = {
    labels: productName,
    datasets: [
      {
        data: productQuantity,
        backgroundColor: ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc', '#d2d6de'],
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


