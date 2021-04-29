import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { Router } from '@angular/router';
import { SignInService } from '../sign-in.service';
import { Employee } from '../employee.model';
import { ThisReceiver } from '@angular/compiler';
import * as bcrypt from 'bcryptjs';
import { CartService } from '../cart.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  allUsers: Array<User> = [];
  allEmps: Array<Employee> = [];
  n: number = 0;
  msg: string = "";
  adminMsg:string = "";
  constructor(public router: Router, public ser: SignInService, public cart_ser:CartService) { }

  ngOnInit(): void {
    this.ser.loadAllUsersDetails().subscribe(result => this.allUsers = result, error => console.log(error));
    this.ser.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
    this.ser.loadAllAdminDetails().subscribe();
  }
  reroute_productPage(){
    this.router.navigate(["\productPage"]);
  }
  async user_signin(userRef: any) {
    console.log(this.allUsers)
    for (var user of this.allUsers) {
      if (!user.isLockedOut) {
        if (user.email == userRef.c_email && await bcrypt.compare(userRef.c_password, user.hashedPassword)) {
          sessionStorage.setItem("user", user._id);
          console.log("successfully logged in");
          this.ser.reset(user);
          this.cart_ser.setUserID(user);
          this.router.navigate(["\productPage"]);
        }
        else if (user.email == userRef.c_email) {
          this.n++;
          console.log("unsuccessful log in");
          this.ser.incrementNumOfTries(user).subscribe((result: string) => {
            this.msg = "You have entered the incorrect password. " + result;
            if (this.n >= 5) {
              this.ser.lockUserOut(user).subscribe((result: string) => { this.msg = result; });
              this.ser.createTicket(user);
              alert("You have made too many incorrect attempts to login. A ticket has been automatically raised. Please contact the store to have the ticket resolved.");
            }
          });
        }
      }
      else {
        this.msg = "You have been locked from the system. A ticket has been automatically raised. Please contact a store associate to resolve this ticket.";
      }
    }
  }
  reroute_signup() {
    this.router.navigate(["\sign-up"]);
  }

  async emp_admin_signin(empRef: any) {
    for (var emp of this.allEmps) {
      if (emp.email == empRef.e_email) {
        if(await bcrypt.compare(empRef.e_password, emp.hashedPassword)) {
          sessionStorage.setItem("empName", emp.firstName);
          if (emp.isAdmin) {
            sessionStorage.setItem("admin", emp._id);
            this.router.navigate(["\admin"]);
          } else {
            sessionStorage.setItem("employee", emp._id);
            this.router.navigate(["\empUpdate"]);
          }
        } else {
          this.adminMsg = "You have entered the incorrect password. Please try again."
        }
      }
    }
  }
}
