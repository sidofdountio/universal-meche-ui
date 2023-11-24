import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from '../auth/auth.guard';
import { CategoryComponent } from './category/category.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { CustormeComponent } from './custorme/custorme.component';
import { SalesComponent } from './sale/sales/sales.component';

const routes: Routes = [{
  path: 'admin',
  component:SidebarComponent,
  canActivate: [authGuard],
  children: [
    {
      path: '',
      children: [
        {
          path: 'purchase',
          component: PurchaseComponent
        },
        {
          path: 'product',
          component: ProductListComponent
        },
        {
          path: 'category',
          component: CategoryComponent
        },
        {
          path: 'supplier',
          component: SuppliersComponent
        },
        {
          path: 'customer',
          component:CustormeComponent
        },
        {
          path: 'purchase',
          component: PurchaseComponent
        }
        ,
        {
          path: 'sale',
          component: SalesComponent
        },
        {
          path: '',
          component: AdminDashboardComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
