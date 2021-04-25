import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './administrator/administrator.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: "", component:SignInComponent},
  {path: "\sign-up", component:SignUpComponent},
  {path: "\admin", component:AdministratorComponent},
  {path: "\empUpdate", component:EmployeeUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
