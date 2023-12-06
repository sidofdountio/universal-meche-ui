import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataState } from 'src/app/model/enume/data-state';
import { SaleService } from 'src/app/service/sale.service';
import { PurcharseService } from 'src/app/service/purcharse.service';
import { ChargeService } from 'src/app/service/charge.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-billan',
  templateUrl: './billan.component.html',
  styleUrls: ['./billan.component.css']
})
export class BillanComponent implements OnInit, AfterViewInit {
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;

  totalAmountSalePerMonth: number = 0;
  totalAmountPurchasePerMonth: number = 0;
  totalSalePerDay: number = 0;
  totalAmuntSalePerDay: number = 0;
  totalSalary: number = 0;
  charges: number = 0;
  billan: any;
  earn: number = 0;
  daySujet = new BehaviorSubject<number| any>(1);
  amounDaySujet = new BehaviorSubject<number| any>(1);

  constructor(
    private saleService: SaleService,
    private purchaseService: PurcharseService,
    private charserService: ChargeService,
    private snabarService: SnabarService,
    private employeeService: EmployeeService
  ) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    console.log(generateMonthArray());
    this.onCharges();
    this.getSaleByMonth();
    this.getSaleByDay();
    this.getSales();
    this.getPurchasePerMonth();

  }
  billanAnnuelle() {
  }

  billanMensuel() {

  }


  onCharges() {
    this.charserService.getCharges().subscribe(
      (response) => {
        let salary: number = 0;
        let impot: number = 0;
        let loyer: number = 0;
        let ration: number = 0;
        let transport: number = 0;
        let electricity: number = 0;
        let anotherCharge: number = 0;
        // let anotherCharge: AnotherCharge;
        for (let item of response) {
          salary = item.totalSalary;
          impot = item.impot;
          loyer = item.loyer;
          ration = item.ration;
          transport = item.transport;
          electricity = item.electricity;
          anotherCharge = item.anotherCharge.amount;
        }
        // 
        this.charges = impot + loyer + ration + electricity + anotherCharge + salary;
      }
    )
  }

  employees() {
    this.employeeService.employees().subscribe(
      (response) => {
        for (let item of response) {
          this.totalSalary += item.salary;
        }
      }
    )
  }

  getSales() {
    this.saleService.getSales().subscribe(
      (sales) => {
        let total = 0;
        let monthAmounts = [];
        let months: string[] = [];
        let totalSalePerMonth: number[] = [];
        for (let sale of sales) {
          if (sale.month === "January") {
            total += sale.amount;
            monthAmounts[0] = total
          }
          if (sale.month === "February") {
            total += sale.amount;
            monthAmounts[1] = total
          }
          if (sale.month === "March") {
            total += sale.amount;
            monthAmounts[2] = total
          }
          if (sale.month === "April") {
            total += sale.amount;
            monthAmounts[3] = total
          }
          if (sale.month === "May") {
            total += sale.amount;
            monthAmounts[4] = total
          }
          if (sale.month === "June") {
            total += sale.amount;
            monthAmounts[5] = total
          }
          if (sale.month === "July") {
            total += sale.amount;
            monthAmounts[6] = total
          }
          if (sale.month === "August") {
            total += sale.amount;
            monthAmounts[7] = total
          }
          if (sale.month === "September") {
            total += sale.amount;
            monthAmounts[8] = total
          }
          if (sale.month === "October") {
            total += sale.amount;
            monthAmounts[9] = total
          }
          if (sale.month === "November") {
            total += sale.amount;
            monthAmounts[10] = total

          }
          if (sale.month === "DECEMBER") {
            total += sale.amount;
            monthAmounts[11] = total;
            console.log(sale.month)
          }

        }

        let monthName = generateMonthArray();
        // totalSaleAmountPerMonth(monthName, monthAmounts);
      }
    )
  }

  getPurchasePerMonth() {
    this.purchaseService.getPurchasePerMonth().subscribe(
      (response) => {
        for (let purchase of response) {
          this.totalAmountPurchasePerMonth += purchase.amount;
        }
      }
    )
  }
  // =============================================CALCULE=====================================
  getSaleByMonth() {
    this.state = DataState.LOADING_STATE;
    this.saleService.getSaleMonth().subscribe(
      (response) => {
       
        for (let item of response) {
          this.totalAmountSalePerMonth += item.amount;
        }
        let depenceTotal = 0;
        depenceTotal = this.charges + this.totalAmountPurchasePerMonth
        this.earn = this.totalAmountSalePerMonth - depenceTotal;
        this.state = DataState.LOADED_STATE;


      },
      () => {
        this.state = DataState.ERROR_STATE;
        this.snabarService.openSnackBarError("Une Erreure Est Survenue.", "Fermer");

      }
    )
  }
  // =============================================CALCULE=====================================


  getSaleByDay() {
    this.saleService.getSaleDay().subscribe(
      (sales) => {
        let amountDay: any[] = [];
        const dayOfMonthArray = getDayOfMonthArray();
        
        this.totalSalePerDay = sales.length;
        for (var item of sales) {
          this.totalAmuntSalePerDay += item.amount;
          this.daySujet.next(item.day);
          this.amounDaySujet.next(this.totalAmuntSalePerDay);
        }
       
        for (let day = 1; day < dayOfMonthArray.length; day++) {
          if(day === this.daySujet.value){
            amountDay[day] = this.amounDaySujet.value;
          }
        }

        // totalSaleAmountPerDay(dayOfMonthArray,amountDay);
      },
      () => {
      }
    )
  }


}

// function totalSaleAmountPerDay(day: string[], amountPerday: any[]) {
//   const ctx: any = document.getElementById('myChart');
//   const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: day,
//       datasets: [{
//         label: '# MONITORING',
//         data: amountPerday,
//         backgroundColor: 'rgba(0, 123, 255, 0.2)', // Customize the background color
//         borderColor: '#007bff', // Customize the line color
//         pointBorderColor: '#007bff', // Customize the point border color
//         pointBackgroundColor: '#007bff', // Customize the point fill color
//         fill: true, // Enable area fill
//         pointHoverBackgroundColor: '#007bff', // Customize the point hover fill color
//         pointHoverBorderColor: '#007bff' // Customize the point hover border color
//       }]
//     },
//     options: {
//       scales: {
//         x: {
//           beginAtZero: true
//         },
//         y: {
//           beginAtZero: true,
//           suggestedMax: 50 // Customize the maximum value on the y-axis
//         }
//       },
//       plugins: {
//         title: {
//           display: true,
//           text: 'Total Sale Amount Per Day', // Customize the chart title
//           font: {
//             size: 18 // Customize the font size of the chart title
//           }
//         },
//         legend: {
//           display: true,
//           position: 'bottom' // Customize the legend position
//         }
//       }
//     }
//   });
//   return myChart;
// }

export interface MonthAmount {
  month: string;
  amount: number;
}
export interface DaylySale {
  amount: number;
  day: number;
  date: Date | string;
}


// function totalSaleAmountPerMonth(months: string[], totalSalePerMonth: number[]) {
//   const ctx: any = document.getElementById('salePermonth');
//   const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: months,
//       datasets: [{
//         label: 'Total Sale Amount per Month',
//         data: totalSalePerMonth,
//         backgroundColor: 'rgba(0, 123, 255, 0.2)',
//         borderColor: '#007bff',
//         borderWidth: 2
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true,
//           suggestedMax: Math.max(...totalSalePerMonth) + 100,
//           grid: {
//             color: 'rgba(0, 0, 0, 0.1)'
//           },
//           ticks: {
//             font: {
//               size: 12,
//               weight: 'bold'
//             }
//           }
//         },
//         x: {
//           grid: {
//             display: false
//           },
//           ticks: {
//             font: {
//               size: 12,
//               weight: 'bold'
//             }
//           }
//         }
//       },
//       plugins: {
//         title: {
//           display: true,
//           text: 'Total Sale Amount per Month',
//           font: {
//             size: 18,
//             weight: 'bold'
//           }
//         },
//         legend: {
//           display: true,
//           position: 'bottom',
//           labels: {
//             font: {
//               size: 12
//             }
//           }
//         }
//       }
//     }
//   });

//   return myChart;
// }

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
  return dayOfMonthArray ;
}

