import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin.authguard';
import { AdministratorComponent } from './administrator/administrator.component';
import { CartComponent } from './cart/cart.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeUnlockComponent } from './employee-unlock/employee-unlock.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAuthGuard } from './user.authguard';
import { EmployeeAuthGuard } from './employee.authguard';

const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "\sign-up", component: SignUpComponent },
  { path: "\admin", component: AdministratorComponent, canActivate: [AdminAuthGuard] },
  { path: "\productPage", component: ProductPageComponent, canActivate: [UserAuthGuard] },
  { path: "\cart", component: CartComponent, canActivate: [UserAuthGuard] },
  { path: "\employee", component: EmployeeComponent, canActivate: [EmployeeAuthGuard] },
  { path: "\empUpdate", component: EmployeeUpdateComponent, canActivate: [EmployeeAuthGuard] },
  { path: "\empRequest", component: EmployeeRequestComponent, canActivate: [EmployeeAuthGuard] },
  { path: "\profilePage", component: UserProfileComponent, canActivate: [UserAuthGuard] },
  { path: "\empUnlock", component: EmployeeUnlockComponent, canActivate: [EmployeeAuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
