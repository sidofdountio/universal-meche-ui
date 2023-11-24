import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productCategorys: ProductCategory[] =[];
  productToSave!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuild: FormBuilder) {
      
    }

  ngOnInit(): void {
    this.productCategorys = [{
      id:1,
      name: 'test',
      categoryType:{
        id : 1,
        name: 'test'
      }
    }]
    this.productToSave = this.formBuild.group({
      id: ['', []],
      name: ['', Validators.required],
      price: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      code: ['', Validators.required],
      description: [''],
      color: [''],
      lenght: ['',[Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
      categoryTypeForm: this.formBuild.group({
        id: ['', Validators.required]
      })
    });
    
  }

  onClose() {
    this.dialogRef.close();
  }
  onSaveProduct() {
    this.dialogRef.close(this.productToSave.value);
  }

}
