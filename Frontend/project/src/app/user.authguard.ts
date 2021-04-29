import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(public router: Router) {}

    canActivate() {
        let obj = sessionStorage.getItem("user");
        if (obj != null) {
            return true;
        } else {
            this.router.navigate([""]);
            return false;
        }
    }
}