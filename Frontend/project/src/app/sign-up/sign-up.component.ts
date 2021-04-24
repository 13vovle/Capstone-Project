import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public ser:SignInService, public router:Router) { }

  ngOnInit(): void {
  }

  user_signup(userRef:any){
    this.ser.storeUserDetails(userRef);
    this.router.navigate([""]);
  }
}
