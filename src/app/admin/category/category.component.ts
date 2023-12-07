import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductCategory } from 'src/app/model/product-category';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryType } from 'src/app/model/category-type';
import { SnabarService } from 'src/app/service/snabar.service';
import { ProductCategoryTypeService } from 'src/app/service/product-category-type.service';
import { ProductCategoryService } from 'src/app/service/product-category.service';

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
 


  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);
  categorys: ProductCategory[] = [];

  constructor(private fb: FormBuilder, private snackBarService: SnabarService
    , private productCategoryTypeServive: ProductCategoryTypeService,
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
      }
    )
  }

  onSaveProductCategoryType(p: CategoryType) {
    this.productCategoryTypeServive.saveProductCategoryType(p).subscribe(
      () => {
        this.snackBarService.openSnackBar("Catégorie Ajoutée", "Fermer");
      }, () => {
        this.snackBarService.openSnackBar("Erreur", "Fermer");
      }
    )
  }



  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
