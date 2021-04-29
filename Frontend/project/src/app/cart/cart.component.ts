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
  user?:User;
  userCart?:Array<Product>;
  newCart?:Array<Product> = [];

  constructor(public cart_ser:CartService, public prod_ser:ProductService) { }

  ngOnInit(): void {
    this.cart_ser.getUser(this.cart_ser.getUserID()).
    subscribe(result => {
      this.user = result;
      this.userCart = this.user?.cart;    
    }, error => console.log(error));
  }

  delete(product:any){
    this.cart_ser.delete(product, this.cart_ser.getUserID());
    this.prod_ser.updateStoreQuantity(product,1);
  }

  checkout(){
     this.cart_ser.checkout();
  }
}
