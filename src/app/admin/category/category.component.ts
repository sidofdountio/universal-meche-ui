import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ProductCategory } from 'src/app/model/product-category';
import { SnabarService } from 'src/app/service/snabar.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  productCategoryForm = this.fb.group({
    name: ['', [Validators.required]],
    categoryTypeForm: this.fb.group({
      id: [''],
      name: ['']
    })
  });
 
  categorys: ProductCategory[] = [];

  constructor(private fb: FormBuilder, private snackBarService: SnabarService,
    private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.getProductCategory();
  }

  onSubmitProductCategory() {
    console.log(this.productCategoryForm.value);
    let category: ProductCategory = {
      name: this.productCategoryForm.value.name as string
    };
    this.addNewCategory(category);
    this.productCategoryForm.reset();
  }

  addNewCategory(productCategory: ProductCategory) {
    this.isLoadingSubject.next(true);
    this.productCategoryService.saveProductCategory(productCategory).subscribe(
      () => {
        this.snackBarService.openSnackBarSuccess("Catégorie Ajoutée", "Fermer");
        this.getProductCategory();
        this.isLoadingSubject.next(false);
      }, () => {
        this.snackBarService.openSnackBarError("Une erreure est survenue", "Fermer");
        this.isLoadingSubject.next(false);
      }
    )
  }


  getProductCategory() {
    this.productCategoryService.getProductCategory().subscribe(
      (response) => {
        this.categorys = response;
      },
      (error:HttpErrorResponse)=>{
        console.log("error %s", error.message);
      }
    )
  }


  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
