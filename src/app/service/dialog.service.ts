import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../model/dialog-data';
import { BehaviorSubject } from 'rxjs';
import { DialogMessageComponent } from '../message/dialog-message/dialog-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  data:DialogData={
    message: '',
    discase: false
  }
  discase = new BehaviorSubject<boolean>(false);
  constructor(public dialog: MatDialog) { }

  message(message: string) {
    this.openDialog(message)
  }

  openDialog(message: string): void {
    this.data.message = message;
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      height: '400px',
      width: '600px',
      enterAnimationDuration: "0ms",
      exitAnimationDuration: "0ms",
      
      data: this.data,
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
