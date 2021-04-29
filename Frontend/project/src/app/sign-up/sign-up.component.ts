import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  allUsers: Array<User> = [];
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
  msg?: string;
  hide: boolean = true;

  constructor(public ser: SignInService, public router: Router) { }

  ngOnInit(): void {
    this.ser.loadAllUsersDetails().subscribe(result => this.allUsers = result, error => console.log(error));
  }

  user_signup() {
    console.log(this.signupRef.value);
    let emailMatch = false;
    for (var user of this.allUsers) {
      if (this.signupRef.value.email == user.email) {
        emailMatch = true;
        this.msg = "This email is already registered to an account. Please enter a new email address or contact a store associate to resolve this issue."
      }
    }
    if (!emailMatch) {
      this.ser.storeUserDetails(this.signupRef.value).subscribe(result => this.msg = result, error => console.log(error));
      this.resetForm(this.signupRef);
      this.resetForm(this.signupRef.get("address")! as FormGroup);
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key)!.setErrors(null);
    });
  }
}
