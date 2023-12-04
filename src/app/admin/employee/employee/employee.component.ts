import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { DialogService } from 'src/app/service/dialog.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { SnabarService } from 'src/app/service/snabar.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    firstName: "",
    lastName: "Nguesson",
    phone: undefined,
    address: undefined,
    birtDay: '',
    sexe: '',
    salary: undefined
  };

  constructor(
    private dialogService: DialogService,
    private dialog: MatDialog,
    private snackBarService: SnabarService,
    private employeeService: EmployeeService) { }


    ngOnInit(): void {
      this.onGetEmployees();
    }
  onGetEmployees() {
    this.employeeService.employees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.snackBarService.openSnackBarSuccess("Liste Des Employes", "Fermer");
      }, () => {
        this.snackBarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  addEmployee() {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = this.employee;
    const dialogRef = this.dialog.open(AddEmployeeComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (employee) => {
          console.log(employee);
          this.saveEmployee(employee);
        },
        () => {
          console.log("Error due save product");
        })
  }

  saveEmployee(employee: Employee) {
    this.employeeService.saveEmployee(employee).subscribe(
      () => {
        this.onGetEmployees();
        this.snackBarService.openSnackBarSuccess("Le Nouveau Employee A ete Ajoute", "Fermer");
      },
      () => {
        this.snackBarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  updateEmployee(employee: Employee) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = employee;
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (employee) => {
          console.log(employee);
          this.saveEmployee(employee);
        },
        () => {
          console.log("Error due save product");
        })
  }

  delteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.snackBarService.openSnackBarSuccess("L'Employee A Ete Supprimer.", "Fermer");
      },
      () => {
        this.snackBarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

  confirmDelete(employee: Employee) {
    this.dialogService.message(`Voulez Vous Supprimer ${employee.lastName} `);
    this.dialogService.checkDiscaseValue().subscribe(
      (reponse) => {
        if (!reponse) {
          return;
        }
        this.delteEmployee(employee.id);
      }
    )
  }
}
