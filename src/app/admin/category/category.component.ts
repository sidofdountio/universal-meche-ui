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
  categoryTypeList: CategoryType[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryTypeCtrl = new FormControl('');
  filteredCategoryTypes: Observable<string[]>;
  categoryTypes: string[] = [];
  allCategoryTpes: string[] = ['Kanekalon', 'Toyokalon', 'Modacrylique'];
  categoryTypeToSave: CategoryType ={
    id: 1,
    name: ''
  };

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(private fb: FormBuilder, private snackBarService: SnabarService
    ,private productCategoryTypeServive:ProductCategoryTypeService,
    private productCategoryService: ProductCategoryService) {
    this.filteredCategoryTypes = this.categoryTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((categoryType: string | null) => (categoryType ? this._filter(categoryType) : this.allCategoryTpes.slice())),
    );
  }

  ngOnInit(): void {
    this.getProductCategoryType();
  }



  onSubmitProductCategory() {
    console.log(this.productCategoryForm.value);
    let category:ProductCategory = {
      name: this.productCategoryForm.value.name as string,
      categoryType: {
        id: this.productCategoryForm.value.categoryTypeForm?.id,
        name: ''
      }
    };
    this.addNewCategory(category);
    this.productCategoryForm.reset();
  }

  addNewCategory(productCategory: ProductCategory) {
    this.isLoadingSubject.next(true);
    this.productCategoryService.saveProductCategory(productCategory).subscribe(
      ()=>{
        this.snackBarService.openSnackBarSuccess("Catégorie Ajoutée", "Fermer");
        this.isLoadingSubject.next(false);
      },()=>{
        this.snackBarService.openSnackBarError("Une erreure est survenue", "Fermer");
        this.isLoadingSubject.next(false);
      }
    )
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.categoryTypes.push(value);
      this.categoryTypeToSave={
        id: undefined,
        name:value,
      }
      this.onSaveProductCategoryType(this.categoryTypeToSave);
      this.getProductCategoryType();
      this.snackBarService.openSnackBar("Catégorie Ajoutée", "Fermer");
    }
    // Clear the input value
    event.chipInput!.clear();
    this.categoryTypeCtrl.setValue(null);
  }

  remove(categoryType: string): void {
    const index = this.categoryTypes.indexOf(categoryType);

    if (index >= 0) {
      this.categoryTypes.splice(index, 1);
      this.announcer.announce(`Removed ${categoryType}`);
      this.snackBarService.openSnackBarSuccess("Catégorie Retirée", "close")
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categoryTypeToSave={
      id: undefined,
      name:event.option.viewValue,
    }
    this.onSaveProductCategoryType(this.categoryTypeToSave);
    this.getProductCategoryType();
    this.categoryTypes.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.categoryTypeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategoryTpes.filter(categoryType => categoryType.toLowerCase().includes(filterValue));
  }

  getProductCategoryType(){
    this.productCategoryTypeServive.getProductCategoryType().subscribe(
      (response)=>{
       this.categoryTypeList = response;
      }
    )
  }

  onSaveProductCategoryType(p:CategoryType){
    this.productCategoryTypeServive.saveProductCategoryType(p).subscribe(
      ()=>{
        this.snackBarService.openSnackBar("Catégorie Ajoutée", "Fermer");
      },()=>{
        this.snackBarService.openSnackBar("Erreur", "Fermer");
      }
    )
  }

  onDeleteProductCategoryType(id:number){
    this.productCategoryTypeServive.delete(id).subscribe(
      ()=>{
        this.snackBarService.openSnackBar("Catégorie Supprimee", "Fermer");
      }
    )
  }


  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
