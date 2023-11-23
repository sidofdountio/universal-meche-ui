import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { Purchase } from 'src/app/model/purchase';
import { Supplier } from 'src/app/model/supplier';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  purchaseToAdd: Purchase = {
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
  }
  formPurchase = this.fb.group({
    price: [this.data.price, [Validators.required]],
    quantity: [, [Validators.required]],
    formSupplier: this.fb.group({
      id: [, [Validators.required]]
    }),
    formProduct: this.fb.group({
      id: [this.data.id]
    })
  });
  suppliers: Supplier[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddPurchaseComponent>,
    private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.suppliers = [];
  }

  onPurchaseProduct() {
    this.dialogRef.close(this.formPurchase.value as Purchase)
  }
  onClose() {
    this.dialogRef.close();
  }

}
