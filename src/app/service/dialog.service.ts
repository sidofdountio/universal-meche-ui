import { Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../model/dialog-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { DialogMessageComponent } from '../message/dialog-message/dialog-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private data: DialogData = {
    message: '',
    discase: false
  }
  discase = new BehaviorSubject<boolean>(false);
  constructor(public dialog: MatDialog) { }

  message(message: string) {
    this.openDialog(message)
  }

  private openDialog(message: string): void {
    this.data.message = message;
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      height: '200px',
      width: '600px',
      enterAnimationDuration: "0ms",
      exitAnimationDuration: "0ms",
      data: this.data
    });

    // Get output after it's close
    dialogRef.afterClosed().subscribe(
      (response:DialogData)=>{
        this.discase.next(response.discase);
      }
    );
  }

// Observable That chech the values of this Discase: true | false
// Then Allown process if it's true and cancel it if it' False.
  checkDiscaseValue(): Observable<boolean> {
    return this.discase.asObservable();
   }
  
   updateValue() {
    this.discase.next(false);
  }
}
