import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseRequest } from 'src/app/model/purchase-request';
import { Supplier } from 'src/app/model/supplier';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {


  formPurchase = this.fb.group({
    price: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    salePrice: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    quantity: ['', [Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
    formSupplier: this.fb.group({
      id: ['', [Validators.required]]
    }),
    formProduct: this.fb.group({
      id: ['',[Validators.required]]
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
    this.dialogRef.close(this.formPurchase.value as PurchaseRequest);
  }
  onClose() {
    this.dialogRef.close();
  }

}
