import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { CartComponent } from './cart/cart.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: "", component:SignInComponent},
  {path: "\sign-up", component:SignUpComponent},
  {path: "\admin", component:AdministratorComponent},
  {path: "\productPage", component:ProductPageComponent},
  {path: "\cart", component:CartComponent},
  {path: "\empUpdate", component:EmployeeUpdateComponent},
  {path: "\empRequest", component:EmployeeRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
