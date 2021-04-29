import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class EmployeeAuthGuard implements CanActivate {
    constructor(public router: Router) {}

    canActivate() {
        let obj = sessionStorage.getItem("employee");
        console.log(obj)
        if (obj != null) {
            return true;
        } else {
            this.router.navigate([""]);
            return false;
        }
    }
}