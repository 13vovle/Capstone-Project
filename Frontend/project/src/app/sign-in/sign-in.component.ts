import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { Router } from '@angular/router';
import { SignInService } from '../sign-in.service';
import { Employee } from '../employee.model';
import { ThisReceiver } from '@angular/compiler';
import * as bcrypt from 'bcryptjs';
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
  constructor(public router: Router, public ser: SignInService) { }

  ngOnInit(): void {
    this.ser.loadAllUsersDetails().subscribe(result => this.allUsers = result, error => console.log(error));
    this.ser.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
  }
  user_signin(userRef: any) {

    for (var user of this.allUsers) {
      if (user.isLockedOut == false) {
        if (user.email == userRef.c_email && user.hashedPassword == userRef.c_password) {
          console.log("successfully logged in");
          this.ser.reset(user);
          this.router.navigate(["\productPage"]);
        }
        else if (user.email == userRef.c_email && user.hashedPassword != userRef.c_password) {
          this.n++;
          console.log("unsuccessful log in");
          this.ser.incrementNumOfTries(user).subscribe((result: string) => {
            this.msg = result;
            if (this.n >= 5) {
              this.ser.lockUserOut(user).subscribe((result: string) => { this.msg = result; });
              this.ser.createTicket(user);
              alert("You have made too many incorrect attempts to login. A ticket has been automatically raised. Please contact the store to have the ticket resolved.");
            }
          });
        }
      }
      else {
        alert("You have made too many incorrect attempts to login. A ticket has been automatically raised. Please contact the store to have the ticket resolved.");
        this.msg = "You have been locked from the system. A ticket has been automatically raised. Please contact a store associate to resolve this ticket.";
      }
    }
  }
  reroute_signup() {
    this.router.navigate(["\sign-up"]);
  }

  async emp_admin_signin(empRef: any) {
    for (var emp of this.allEmps) {
      if (emp.email == empRef.e_username && await bcrypt.compare(empRef.e_password, emp.hashedPassword)) {
        if (emp.isAdmin) {
          sessionStorage.setItem("admin", emp._id);
          this.router.navigate(["\admin"]);
        } else {
          sessionStorage.setItem("employee", emp._id);
          this.router.navigate(["\employee"]);
        }
      }
    }
  }
}
