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
  msg:string = "";
  constructor(public router:Router, public ser:SignInService) { }
  
  ngOnInit(): void {
    this.ser.loadAllUsersDetails().subscribe(result => this.allUsers = result, error => console.log(error));
  }
  user_signin(userRef:any){
    
  
    for(var user of this.allUsers){
      if(user.email == userRef.c_email && user.hashedPassword == userRef.c_password){
        console.log("successfully logged in")
      }
      else if(user.email == userRef.c_email && user.hashedPassword != userRef.c_password){
        console.log("unsuccessful log in");
        this.ser.incrementNumOfTries(user).subscribe((result:string) => {
          this.msg = result;
        });

      }
    }
  }
  reroute_signup(){
    this.router.navigate(["\sign-up"]);
  }
  
  emp_admin_signin(employeeRef:any){

  }

}
