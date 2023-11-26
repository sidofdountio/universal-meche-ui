import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Charge } from 'src/app/model/charge';
import { ChargeService } from 'src/app/service/charge.service';
import { UpdateChargeComponent } from './update-charge/update-charge.component';
import { SnabarService } from 'src/app/service/snabar.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.css']
})
export class ChargeComponent implements OnInit, AfterViewInit {
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  charges: Charge[] = [{
    id: 0,
    totalSalaire: 0,
    impot: 0,
    loyer: 0,
    ration: 0,
    transport: 0,
    electriciter: 0,
    autreCharge: {
      id: 0,
      raison: 'raison',
      amount: 0
    }
  }];

  constructor(private fb: FormBuilder, private chargeService: ChargeService,
    private dialog: MatDialog, private snackBarService: SnabarService, private employeeService: EmployeeService) { }

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {

  }

  updateCharge(charge: Charge) {
    const configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.disableClose = true;
    configDialog.data = charge;
    const dialogRef = this.dialog.open(UpdateChargeComponent, configDialog);
    dialogRef.afterClosed()
      .subscribe(
        (charge) => {
          console.log(charge);
          this.saveChargeChange(charge);
        },
        () => {
          console.log("Error due save product");
        })
  }

  saveChargeChange(charge: Charge) {
    this.chargeService.saveCharge(charge).subscribe(
      () => {
        this.snackBarService.openSnackBarSuccess("Les Charges Ont Ete Modifiee Avec Success.", "Fermer");
      },
      () => {
        this.snackBarService.openSnackBarError("Une Erreure Est Survenue", "Fermer");
      }
    )
  }

}
