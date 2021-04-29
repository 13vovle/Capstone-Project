import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user.model'
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetail: any
  name: string = ''
  updateProfile: boolean = false
  updateFunds: boolean = false;
  updateFundsMsg?: string;

  constructor(public userSer: UserService) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }
  showHideSection(flag: string) {
    if (flag == "updateProfile") {
      this.updateProfile = !this.updateProfile
    } else if (flag == "updateFunds") {
      this.updateFunds = !this.updateFunds
    }
  }
  loadUserDetails() {
    let userId = sessionStorage.getItem('user');
    this.userSer.loadUsersDetails(userId).subscribe(result => this.userDetail = result, error => console.log(error));
  }
  updateProfileFunc(profileRef: any) {
    //console.log(productRef);
    this.userSer.updateProfile(profileRef);
  }

  updateFundsFunc(updateFundsRef: any) {
    // console.log(updateFundsRef);
    let transfer = updateFundsRef.transfer;
    if (transfer > this.userDetail.account.amount) {
      this.updateFundsMsg = "Insufficient balance in account";
    } else {
      this.userSer.transferFunds(transfer);
      this.updateFundsMsg = "Transfer complete";
    }
  }
}
