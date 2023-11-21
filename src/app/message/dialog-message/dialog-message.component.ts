import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/dialog-data';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,private dialogRef: MatDialogRef<DialogMessageComponent>) { }

  save(): void {
    this.data.discase = true;
    this.dialogRef.close(this.data);

  }
  cancel(): void {
    this.data.discase = false;
    this.dialogRef.close(this.data);
  }
}
