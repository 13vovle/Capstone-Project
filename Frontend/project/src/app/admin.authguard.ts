import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(public router: Router) {}

    canActivate() {
        let obj = sessionStorage.getItem("admin");
        if (obj != null) {
            return true;
        } else {
            this.router.navigate([""]);
            return false;
        }
    }
}