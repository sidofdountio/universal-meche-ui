import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard } from '../auth/auth.guard';

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
