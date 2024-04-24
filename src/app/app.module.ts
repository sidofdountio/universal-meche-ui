import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './message/page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';

import { GetStartComponent } from './get-start/get-start.component';
import { SnackBarComponent } from './message/snack-bar/snack-bar.component';
import { DialogMessageComponent } from './message/dialog-message/dialog-message.component';
import { SnackbarErrorComponent } from './message/snackbar-error/snackbar-error.component';
import { AuthModule } from './auth/auth.module';
@NgModule({
  declarations: [

    AppComponent,
    PageNotFoundComponent,
    GetStartComponent,
    SnackBarComponent,
    DialogMessageComponent,
    SnackbarErrorComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
