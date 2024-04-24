import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productToUpdate =this.formBuild.group({
    id: [this.data.id],
    name: [this.data.name, Validators.required,],
    price: [this.data.price, Validators.required],
    code: [this.data.code, Validators.required],
    description: [this.data.description],
    color: [this.data.color],
    length: [this.data.length]
   
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, 
  private formBuild: FormBuilder, 
  public dialogRef: MatDialogRef<UpdateProductComponent>) {
    
  }

  onClose() {
    this.dialogRef.close();
  }

  onUpdateProduct() {
    let product: Product = {
      id: undefined,
      name: this.productToUpdate.value.name as string,
      price: this.productToUpdate.value.price as any,
      salePrice: 0,
      code: this.productToUpdate.value.code as string,
      color: this.productToUpdate.value.color as string,
      length: this.productToUpdate.value.length as any,
      description: this.productToUpdate.value.description as string,
      productCategory: {
        id: undefined,
        name: ''
      }
    };
    this.dialogRef.close(this.productToUpdate.value)
  }
}
