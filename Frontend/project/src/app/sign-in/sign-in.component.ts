import { Component, OnInit } from '@angular/core';
import { User } from '../user.model'
import { Router } from '@angular/router';
import { SignInService } from '../sign-in.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  allUsers:Array<User>=[];
  constructor(public router:Router, public ser:SignInService) { }
  
  ngOnInit(): void {
  }
  user_signin(userRef:any){
    this.ser.loadAllUsersDetails().subscribe(result => this.allUsers = result, error => console.log(error));
    console.log(userRef.c_email)
    for(var user of this.allUsers){
      if(user.email === userRef.c_email && user.hashedPassword === userRef.c_password)
      {
        console.log("successfully logged in")
      }
    }
  }
  reroute_signup(){
    this.router.navigate(["\sign-up"]);
  }
  
  emp_admin_signin(employeeRef:any){

  }

}
