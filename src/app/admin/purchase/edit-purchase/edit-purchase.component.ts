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
  purchaseToEdite: Purchase = {
    price: 0,
    quantity: 0,
    amount: 0,
    purchaseAt: '',
    supplier: {
      name: '',
      address: '',
      phone: ''
    },
    product: {
      name: '',
      price: 0,
      code: '',
      color: '',
      description: '',
      productCategory: {
        name: '',
        categoryType: {
          name: ''
        }
      }
    }
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Purchase,
    public dialogRef: MatDialogRef<EditPurchaseComponent>,
    private fb: FormBuilder) {
      this.formPurchase = this.fb.group({
        quantity: [data.quantity,Validators.nullValidator],
        price: [data.price,Validators.nullValidator]

      })

  }
  onEditPurchase() {
    this.dialogRef.close();
  }
  onClose() {
    this.dialogRef.close();
  }

}
