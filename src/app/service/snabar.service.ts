import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../message/snack-bar/snack-bar.component';
import { SnackbarErrorComponent } from '../message/snackbar-error/snackbar-error.component';


@Injectable({
  providedIn: 'root'
})
export class SnabarService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private durationInSecond: number = 5;

  constructor(private _snackBar: MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSecond * 1000,
     

    });
  }



  openSnackBarError(message: string, action: string) {
    this._snackBar.openFromComponent(SnackbarErrorComponent, {
      data: {
        message,
        action,
      },
      duration: this.durationInSecond * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBarSuccess(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        action,
      },
      duration: this.durationInSecond * 1000,
      horizontalPosition: "left",
      verticalPosition : "bottom"
    });
  }


}
