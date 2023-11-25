import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductCategory } from 'src/app/model/product-category';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { CategoryType } from 'src/app/model/category-type';
import { SnabarService } from 'src/app/service/snabar.service';

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

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(private fb: FormBuilder, private snackBarService: SnabarService) {
    this.filteredCategoryTypes = this.categoryTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((categoryType: string | null) => (categoryType ? this._filter(categoryType) : this.allCategoryTpes.slice())),
    );
  }

  ngOnInit(): void {

  }

  onSubmitProductCategory() {
    this.addNewCategory(this.productCategoryForm.value as ProductCategory);
  }

  addNewCategory(productCategory: ProductCategory) {
    this.isLoadingSubject.next(true);
    setTimeout(() => {
      console.log(productCategory);
      this.isLoadingSubject.next(false);
    }, 1000)
    // TODO: CALL API
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categoryTypes.push(value);
      this.categoryTypeList.push({ name: value });
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
    if (this.categoryTypes.length !== 0) {
      let it =1;
      for (let item of this.categoryTypes) {
        it ++;
        if (event.option.viewValue !== item) {
          this.categoryTypes.push(event.option.viewValue);
          this.categoryTypeList.push({ name: event.option.viewValue,id: it });
        }
      }
    }
    else {
      this.categoryTypes.push(event.option.viewValue);
      this.categoryTypeList.push({ name: event.option.viewValue ,id:1});
    }

    this.snackBarService.openSnackBar("Catégorie Ajoutée", "Fermer");
    this.fruitInput.nativeElement.value = '';
    this.categoryTypeCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategoryTpes.filter(categoryType => categoryType.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
