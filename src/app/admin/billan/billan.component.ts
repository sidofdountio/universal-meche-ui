import { Component, OnInit } from '@angular/core';
import { DataState } from 'src/app/model/enume/data-state';
import { SaleService } from 'src/app/service/sale.service';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { ChargeService } from 'src/app/service/charge.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { BehaviorSubject } from 'rxjs';
import Chart from 'chart.js/auto';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-billan',
  templateUrl: './billan.component.html',
  styleUrls: ['./billan.component.css']
})
export class BillanComponent implements OnInit {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  totalAmountSalePerMonth: number = 0;
  totalAmountPurchasePerMonth: number = 0;
  chargeAmount: number = 0;
  benefice: number = 0;

  constructor(
    private saleService: SaleService,
    private chargeService: ChargeService,
    private snabarService: SnabarService,
  ) { }


  ngOnInit(): void {
    this.getSales();
    this.  getSaleByMonth();

    this.chargeService.monthWinner().subscribe(
      (response) => {
        this.totalAmountPurchasePerMonth = response.purchase;
        this.totalAmountSalePerMonth = response.sale;
        this.chargeAmount = response.charge;
        this.benefice = response.potentialWinner;
      },
      () => {
       
      }
    )
  }

  getSaleByMonth() {
    this.state = DataState.LOADING_STATE;
    this.saleService.getSaleMonth().subscribe(
      (response) => {
        this.state = DataState.LOADED_STATE;
      },
      () => {
        this.state = DataState.ERROR_STATE;
        this.snabarService.openSnackBarError("Une Erreure Est Survenue.", "Fermer");
      }
    )
  }

  

  getSales() {
    this.saleService.getSales().subscribe(
      (sales) => {
        let total = 0;
        let monthAmounts = [];
        for (let sale of sales) {
          if (sale.month === "JANUARY") {
            total += sale.amount;
            monthAmounts[0] = total/3000
          }
          if (sale.month === "FEBRUARY") {
            total += sale.amount;
            monthAmounts[1] = total/3000
          }
          if (sale.month === "MARCH") {
            total += sale.amount;
            monthAmounts[2] = total/3000
          }
          if (sale.month === "APRIL") {
            total += sale.amount;
            monthAmounts[3] = total/3000
          }
          if (sale.month === "MAY") {
            total += sale.amount;
            monthAmounts[4] = total/3000
          }
          if (sale.month === "JUNE") {
            total += sale.amount;
            monthAmounts[5] = total/3000
          }
          if (sale.month === "JULY") {
            total += sale.amount;
            monthAmounts[6] = total/3000
          }
          if (sale.month === "AUGUST") {
            total += sale.amount;
            monthAmounts[7] = total/3000
          }
          if (sale.month === "SEPTEMBER") {
            total += sale.amount;
            monthAmounts[8] = total/3000
          }
          if (sale.month === "OCTOBER") {
            total += sale.amount;
            monthAmounts[9] = total/1000
          }
          if (sale.month === "NOVEMBER") {
            total += sale.amount;
            monthAmounts[10] = total/3000
          }
          if (sale.month === "DECEMBER") {
            total += sale.amount;
            monthAmounts[11] = total/3000;
            console.log(sale.month)
          }
        }
        let monthName = generateMonthArray();
        totalSaleAmountPerMonth(monthName, monthAmounts);
      },
      (error: HttpErrorResponse) => {
        console.log("error %s", error.message);
      }
    )
  }

  
}

function totalSaleAmountPerDay(day: string[], amountPerday: any[]) {
  const ctx: any = document.getElementById('myChart');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: day,
      datasets: [{
        label: '# MONITORING',
        data: amountPerday,
        backgroundColor: 'rgba(0, 123, 255, 0.2)', // Customize the background color
        borderColor: '#007bff', // Customize the line color
        pointBorderColor: '#007bff', // Customize the point border color
        pointBackgroundColor: '#007bff', // Customize the point fill color
        fill: true, // Enable area fill
        pointHoverBackgroundColor: '#007bff', // Customize the point hover fill color
        pointHoverBorderColor: '#007bff' // Customize the point hover border color
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true,
          suggestedMax: 50 // Customize the maximum value on the y-axis
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Total Sale Amount Per Day', // Customize the chart title
          font: {
            size: 18 // Customize the font size of the chart title
          }
        },
        legend: {
          display: true,
          position: 'bottom' // Customize the legend position
        }
      }
    }
  });
  return myChart;
}

export interface DaylySale {
  amount: number;
  day: number;
  date: Date | string;
}


function totalSaleAmountPerMonth(months: string[], totalSalePerMonth: number[]) {
  const ctx: any = document.getElementById('salePermonth');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Total Sale Amount per Month',
        data: totalSalePerMonth,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: '#007bff',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: Math.max(...totalSalePerMonth) + 100,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Total Sale Amount per Month',
          font: {
            size: 18,
            weight: 'bold'
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            font: {
              size: 12
            }
          }
        }
      }
    }
  });

  return myChart;
}

function calculateTotalSalePerMonth(dailySales: DaylySale[]) {
  const totalSalePerMonth = Array(12).fill(0); // Initialize an array with 12 elements, each set to 0

  dailySales.forEach(sale => {
    const date = new Date(sale.date);
    const month = date.getMonth();
    const amount = sale.amount;

    totalSalePerMonth[month] += amount;
  });

  return totalSalePerMonth;
}

function generateMonthArray() {
  const months = [];
  const date = new Date();
  for (let i = 0; i < 12; i++) {
    date.setMonth(i);
    const monthName = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
    months.push(monthName);
  }
  return months;
}

function getDayOfMonthArray() {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const monthLength = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const dayOfMonthArray = [];
  for (let i = 1; i <= monthLength; i++) {
    if (i === currentDay) {
      dayOfMonthArray.push(`[${i}]`);
    } else {
      dayOfMonthArray.push(i.toString());
    }
  }
  return dayOfMonthArray;
}

