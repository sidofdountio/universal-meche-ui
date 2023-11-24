import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';




import { AdminRoutingModule } from './admin-routing.module';
import { ProductListComponent } from './product/product-list/product-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AddPurchaseComponent } from './purchase/add-purchase/add-purchase.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoryComponent } from './category/category.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { EditPurchaseComponent } from './purchase/edit-purchase/edit-purchase.component';
import { CustormeComponent } from './custorme/custorme.component';
import { SalesComponent } from './sale/sales/sales.component';
import { AddSaleComponent } from './sale/add-sale/add-sale.component';




@NgModule({
  declarations: [
    ProductListComponent,
    PurchaseComponent,
    AddPurchaseComponent,
    AddProductComponent,
    SidebarComponent,
    AdminDashboardComponent,
    CategoryComponent,
    UpdateProductComponent,
    SuppliersComponent,
    EditPurchaseComponent,
    CustormeComponent,
    SalesComponent,
    AddSaleComponent
  ],
  imports: [
    MatBadgeModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
