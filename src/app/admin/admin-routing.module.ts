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
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoice/invoice-details/invoice-details.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ChargeComponent } from './charge/charge.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { BillanComponent } from './billan/billan.component';

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
          path: 'invoices',
          component: InvoiceListComponent
        },
        {
          path: 'invoice/:id',
          component: InvoiceDetailsComponent
        },
        {
          path: 'inventory',
          component: InventoryComponent,
        },
        {
          path: 'config',
          component: ChargeComponent
        },
        {
          path: 'employee',
          component: EmployeeComponent
        },
        {
          path: "billan",
          component: BillanComponent
        }
        ,
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
