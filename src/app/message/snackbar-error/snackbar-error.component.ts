import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/model/snack-bar-data';

@Component({
  selector: 'app-snackbar-error',
  templateUrl: './snackbar-error.component.html',
  styleUrls: ['./snackbar-error.component.css']
})
export class SnackbarErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData) {
  }
  
  snackBarRef = inject(MatSnackBarRef);
}
