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
  product: Product ={
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
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuild: FormBuilder) {
      this.product={
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
      };
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
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      code: [this.product.code, Validators.required],
      description: [this.product.description],
      color: [this.product.color],
      lenght: [this.product.length],
      categoryTypeForm: this.formBuild.group({
        id: [this.product.productCategory.id, Validators.required]
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
