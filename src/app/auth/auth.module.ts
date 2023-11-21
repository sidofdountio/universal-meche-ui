import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RegisterComponent } from "./register/register.component";


@NgModule({
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        AuthRoutingModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
}
)
export class AuthModule {

}