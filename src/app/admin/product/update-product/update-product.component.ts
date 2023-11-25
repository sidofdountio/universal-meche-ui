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

  productToUpdate!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private formBuild: FormBuilder, public dialogRef: MatDialogRef<UpdateProductComponent>) {
    this.productToUpdate =this.formBuild.group({
      id: [data.id],
      name: [data.name, Validators.required,],
      price: [data.price, Validators.required],
      code: [data.code, Validators.required],
      description: [data.description],
      color: [data.color],
      lenght: [data.length]
     
    });
  }

  ngOnInit(): void {
   
  }

  onClose() {
    this.dialogRef.close();
  }

  onUpdateProduct() {
    this.dialogRef.close(this.productToUpdate.value)
  }
}
