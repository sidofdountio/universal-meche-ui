import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { DialogMessageComponent } from 'src/app/message/dialog-message/dialog-message.component';

@Component({
  selector: 'app-valid-sale',
  templateUrl: './valid-sale.component.html',
  styleUrls: ['./valid-sale.component.css']
})
export class ValidSaleComponent {
  discase: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Data, private dialogRef: MatDialogRef<DialogMessageComponent>) { }
  save(): void {
    this.discase = true;
    this.dialogRef.close(this.discase);
  }
  cancel(): void {
    this.discase = false;
    this.dialogRef.close(this.discase);
  }

}
