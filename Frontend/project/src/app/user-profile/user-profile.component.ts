import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user.model'
import { ThrowStmt } from '@angular/compiler';
import { Order } from '../order.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
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
  orderStatus: boolean = false;
  updateFundsMsg?: string;
  userOrder:Array<Order> = [];
  constructor(public userSer: UserService, public productSer: ProductService) { }

  ngOnInit(): void {
    this.loadUserDetails();
    this.getOrderDetails();
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
    console.log(this.userOrder)
  }

  updateProfileFunc(profileRef: any) {
    //console.log(productRef);
    this.userSer.updateProfile(profileRef);
  }

  getOrderDetails(){
    let userId = sessionStorage.getItem('user');
    this.userSer.getOrderDetails(userId).subscribe(result =>{
      this.userOrder = result;
    }, error => console.log(error));
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

  delete(order:any){
    alert("Order canceled!");
    let switchBoolean = false;
   
    this.userSer.increaseFunds(order).subscribe((result:string) =>{console.log(result);});
    this.userSer.deleteOrder(order).subscribe((result:string) =>{console.log(result);});

    let products:Array<Product> =[];
    products = order.product;

    for(let p of products){
      this.productSer.updateStoreQuantity(p, p.quantity);
    }
   
  }

  reroute_login(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
  }

}
