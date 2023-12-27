import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Charge } from 'src/app/model/charge';
import { ChargeService } from 'src/app/service/charge.service';
import { UpdateChargeComponent } from './update-charge/update-charge.component';
import { SnabarService } from 'src/app/service/snabar.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit {
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  charge: Charge[]=[];

  constructor(private fb: FormBuilder, private chargeService: ChargeService,
    private dialog: MatDialog, private snackBarService: SnabarService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getCharges();
  }

  private getCharges() {
    this.chargeService.getCharges().subscribe(
      (response) => {
        this.charge = response;
      },
      (error:HttpErrorResponse)=>{
        console.log("error %s", error.message);
      }
    );
  }

  updateCharge(charge: Charge) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = charge;
    const dialogRef = this.dialog.open(UpdateChargeComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (response) => {
          this.saveChargeChange(response);
        },
        () => {
          console.log("Error due save product");
        })
  }

  saveChargeChange(charge: Charge) {
    this.chargeService.saveCharge(charge).subscribe(
      () => {
        this.snackBarService.openSnackBarSuccess("Les Charges Ont Ete Modifiee Avec Success.", "Fermer");
        this.getCharges();
      },
      () => {
        this.snackBarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

}
