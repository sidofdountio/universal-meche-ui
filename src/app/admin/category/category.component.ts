import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductCategory } from 'src/app/model/product-category';
import { COMMA, ENTER, I } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { SnabarService } from 'src/app/service/snabar.service';
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

  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryTypeCtrl = new FormControl('');
  filteredCategoryTypes: Observable<string[]>;
  categoryTypes: string[] = [];
  allCategoryTpes: string[] = ['Kanekalon', 'Toyokalon', 'Modacrylique'];
  

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(private fb: FormBuilder, private snackBarService: SnabarService,
    private productCategoryService: ProductCategoryService) {
    this.filteredCategoryTypes = this.categoryTypeCtrl.valueChanges.pipe(
      startWith(null),
      map((categoryType: string | null) => (categoryType ? this._filter(categoryType) : this.allCategoryTpes.slice())),
    );
  }

  ngOnInit(): void {
  
  }



  onSubmitProductCategory() {
    console.log(this.productCategoryForm.value);
    let category:ProductCategory = {
      name: this.productCategoryForm.value.name as string
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

  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategoryTpes.filter(categoryType => categoryType.toLowerCase().includes(filterValue));
  }
  
  ngOnDestroy(): void {
    this.isLoadingSubject.unsubscribe();
  }

}
