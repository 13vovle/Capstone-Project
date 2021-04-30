import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { User } from '../user.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userName = sessionStorage.getItem("userName");
  cart = JSON.parse(sessionStorage.getItem("cart")!);
  user?:User;
  userCart?:Array<Product> =[];
  newCart?:Array<Product> = [];
  total:number = 0;
  length:number = 0;
  constructor(public cart_ser:CartService, public prod_ser:ProductService) { }

  ngOnInit(): void {
    // this.cart_ser.getUser(this.cart_ser.getUserID()).
    // subscribe(result => {
    //   this.user = result;
    //   this.userCart = this.user.cart;
    //   this.length = this.userCart.length;
    //   for(let p of this.userCart){
    //     this.total += (p.quantity) * (p.price);
    //   }
    // }, error => console.log(error));
    for(let p of this.cart){
          this.total += (p.quantity) * (p.price);
        }
  }

  delete(product:any){
    this.cart_ser.delete(product, this.cart_ser.getUserID());
    this.prod_ser.updateStoreQuantity(product,1);
  }

  updateFund(){

  }
  checkout(){
   if(this.cart.length!=0){
    alert("Order was placed!")
     this.cart_ser.checkout(this.cart);
     this.cart_ser.decreaseFund(this.cart).subscribe((result:string)=>{
       console.log(result);
     });
    }
    else alert("Your cart is empty! You cannot place an order.");
    this.cart = [];
    sessionStorage.setItem("cart", "[]");
    this.total = 0;
  }
  
  reroute_login(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
  }

}
