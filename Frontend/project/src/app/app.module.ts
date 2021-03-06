import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeUnlockComponent } from './employee-unlock/employee-unlock.component';
import { AdminAuthGuard } from './admin.authguard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { MatIconModule } from '@angular/material/icon';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { EmployeeAuthGuard } from './emp.authguard';
import { UserAuthGuard } from './user.authguard';
import { EmpInfoComponent } from './emp-info/emp-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ReportInfoComponent } from './report-info/report-info.component';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductPageComponent,
    SignInComponent,
    SignUpComponent,
    EmployeeUpdateComponent,
    EmployeeRequestComponent,
    EmployeeUnlockComponent,
    OrderUpdateComponent,
    UserProfileComponent,
    EmpInfoComponent,
    ProductInfoComponent,
    ReportInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule
  ],
  providers: [AdminAuthGuard, EmployeeAuthGuard, UserAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
