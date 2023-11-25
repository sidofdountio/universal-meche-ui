import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Purchase } from 'src/app/model/purchase';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent {
  formPurchase!: FormGroup;
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: Purchase,
    public dialogRef: MatDialogRef<EditPurchaseComponent>,
    private fb: FormBuilder) {
      this.formPurchase = this.fb.group({
        quantity: [data.quantity,[Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
        price: [data.price,[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        salePrice: [data.salePrice,[Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]]

      })

  }
  onEditPurchase() {
    this.dialogRef.close(this.formPurchase.value);
  }
  onClose() {
    this.dialogRef.close();
  }

}
