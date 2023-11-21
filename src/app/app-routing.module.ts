import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './message/page-not-found/page-not-found.component';
import { GetStartComponent } from './get-start/get-start.component';

const routes: Routes = [
  {
    path: '',
    component:GetStartComponent
  },
  {
    path:'get-start',
    component:GetStartComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    title: 'Page-not-found'
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
