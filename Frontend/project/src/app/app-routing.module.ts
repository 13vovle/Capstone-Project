import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from './admin.authguard';
import { AdministratorComponent } from './administrator/administrator.component';
import { CartComponent } from './cart/cart.component';
import { EmployeeRequestComponent } from './employee-request/employee-request.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { EmployeeUnlockComponent } from './employee-unlock/employee-unlock.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAuthGuard } from './user.authguard';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { EmployeeAuthGuard } from './emp.authguard';


const routes: Routes = [
  { path: "", component: SignInComponent },
  { path: "\sign-up", component: SignUpComponent },
  { path: "\admin", component: AdministratorComponent, canActivate: [AdminAuthGuard] },
  { path: "\productPage", component: ProductPageComponent, canActivate: [UserAuthGuard] },
  { path: "\cart", component: CartComponent, canActivate: [UserAuthGuard] },
  { path: "\empUpdate", component: EmployeeUpdateComponent, canActivate: [EmployeeAuthGuard] },
  { path: "\empRequest", component: EmployeeRequestComponent, canActivate: [EmployeeAuthGuard] },
  {path:  "\orderStatus", component:OrderUpdateComponent, canActivate: [EmployeeAuthGuard]},
  { path: "\empUnlock", component: EmployeeUnlockComponent, canActivate: [EmployeeAuthGuard] },
  { path: "\profilePage", component: UserProfileComponent, canActivate: [UserAuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
