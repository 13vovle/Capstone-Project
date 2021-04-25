import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupRef = new FormGroup({
    fname: new FormControl(),
    lname: new FormControl(),
    dob: new FormControl(),
    phone: new FormControl(),
    address: new FormGroup({
      street1: new FormControl(),
      street2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl(),
    }),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public ser:SignInService, public router:Router) { }

  ngOnInit(): void {
  }

  // user_signup(userRef:any){
  //   this.ser.storeUserDetails(userRef);
  //   this.router.navigate([""]);
  // }
  user_signup() {
    console.log(this.signupRef.value);
    this.ser.storeUserDetails(this.signupRef.value);
  }
}
