import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { ProductCategory } from 'src/app/model/product-category';
import { ProductCategoryService } from 'src/app/service/product-category.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productCategorys: ProductCategory[] = [];
  // productToSave!: FormGroup;
  productToSave = this.formBuild.group({
    id: ['', []],
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    code: ['', Validators.required],
    description: [''],
    color: [''],
    size: ['',],
    categoryTypeForm: this.formBuild.group({
      id: ['', Validators.required]
    })
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddProductComponent>,
    private formBuild: FormBuilder, private productCategoryService: ProductCategoryService) {

  }

  ngOnInit(): void {
    this.productCategoryService.getProductCategory().subscribe(
      (response) => {
        this.productCategorys = response;
      }
    )
  }

  onClose() {
    this.dialogRef.close();
  }
  onSaveProduct() {
    let product: Product = {
      id: undefined,
      name: this.productToSave.value.name as string,
      price: this.productToSave.value.price as any,
      salePrice: 0,
      code: this.productToSave.value.code as string,
      color: this.productToSave.value.color as string,
      length: this.productToSave.value.size as any,
      description: this.productToSave.value.description as string,
      productCategory: {
        id: this.productToSave.value.categoryTypeForm?.id as any,
        name: ''
      }
    };
    console.log(product);
    this.dialogRef.close(product);
  }

}
