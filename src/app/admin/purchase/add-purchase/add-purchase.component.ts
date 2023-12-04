import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseRequest } from 'src/app/model/purchase-request';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/service/supplier.service';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css']
})
export class AddPurchaseComponent implements OnInit {

  formPurchase = this.fb.group({
    price: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)] ],
    salePrice: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    quantity: ['', [Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
    formSupplier: this.fb.group({
      id: ['', [Validators.required]]
    }),
    formProduct: this.fb.group({
      id: [this.data.id,]
    })
  });
  suppliers: Supplier[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddPurchaseComponent>,
    private fb: FormBuilder,
    private supplierService:SupplierService) {

  }

  ngOnInit(): void {
    this.supplierService.getSupplier().subscribe(
      (response)=>{
        this.suppliers = response;
      }
    )
  }

  onPurchaseProduct() {
    const quantity = this.formPurchase.value.quantity as any;
    const price  = this.formPurchase.value.price as any;
    const amount = Math.imul(quantity,price)
    let purchase:Purchase={
      id: undefined,
      price: this.formPurchase.value.price as any ,
      salePrice: this.formPurchase.value.salePrice as any,
      quantity: this.formPurchase.value.quantity as any,
      amount: amount,
      purchaseAt: '',
      year:undefined,
      month:undefined,
      day:undefined,
      supplier: {
        id: this.formPurchase.value.formSupplier?.id as any,
        name: '',
        address: '',
        phone: ''
      },
      product: {
        id: this.formPurchase.value.formProduct?.id ,
        name: '',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        length: 0,
        description: '',
        productCategory: {
          id: undefined,
          name: '',
          categoryType: {
            id: undefined,
            name: ''
          }
        }
      }
    }

    this.dialogRef.close(purchase);
  }
  onClose() {
    this.dialogRef.close();
  }

}
