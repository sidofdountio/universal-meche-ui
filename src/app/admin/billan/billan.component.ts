import { Component, OnInit } from '@angular/core';
import { DataState } from 'src/app/model/enume/data-state';
import { Chart } from 'chart.js/auto';
import { SaleService } from 'src/app/service/sale.service';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { ChargeService } from 'src/app/service/charge.service';

@Component({
  selector: 'app-billan',
  templateUrl: './billan.component.html',
  styleUrls: ['./billan.component.css']
})
export class BillanComponent implements OnInit {
  
  totalSalePerMonth:number = 0;
  totalSalePerDay:number = 0;
  billan: any;
  constructor(
    private saleService: SaleService,
    private purchaseService: PurcharseService,
    private charserService:ChargeService,
  ) { }
  billanAnnuelle() {
  }
  billanMensuel() {

  }
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;

  ngOnInit(): void {
    this.getSaleByDay();
    this.getSaleByMonth();
    const months = generateMonthArray();
    const totalSalePerMonth = [500, 800, 600, 900, 1200, 1000, 700, 1100, 900, 1300, 1500, 1200];
    totalSaleAmountPerMonth(months, totalSalePerMonth);
  }

  getSaleByMonth(){
    this.state = DataState.LOADING_STATE;
    this.saleService.getSaleMonth().subscribe(
      (response)=>{
        this.state = DataState.LOADED_STATE;
        const salePermonth = response;
        for(let item of response){
          this.totalSalePerMonth += item.amount;
        }
      },
      ()=>{
        this.state = DataState.ERROR_STATE;
      }
    )
  }

  getSaleByDay(){
    this.saleService.getSaleDay().subscribe(
      (response)=>{
        const day: number[] = [];
        const totalAmountPerDay: number[] = [];
        const salePermonth = response;
        for(let item of response){
          this.totalSalePerDay += item.amount;
         
        }
        
        for (let index = 0; index < response.length; index++) {
          totalAmountPerDay[index] = response[index].amount;
          day[index]=response[index].day;
        }

        totalSaleAmountPerDay(day, totalAmountPerDay);
      }
    )
  }
}

function totalSaleAmountPerDay(day: number[], totalAmountPerDay: number[]) {
  const ctx: any = document.getElementById('myChart');


  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: day,
      datasets: [{
        label: '# MONITORING',
        data: totalAmountPerDay,
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
  date: Date | string;
}


const dailySales = [
  { date: '2023-01-05', amount: 100 },
  { date: '2023-01-10', amount: 150 },
  { date: '2023-02-12', amount: 200 },
  // ...and so on
];



function totalSaleAmountPerMonth(months: string[], totalSalePerMonth: number[]) {
  const ctx: any = document.getElementById('salePermonth');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Total Sale Amount per Month',
        data: totalSalePerMonth,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: '#007bff',
        borderWidth: 2
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
