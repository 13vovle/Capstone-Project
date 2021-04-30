import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  userName = sessionStorage.getItem("userName");
  cart:Array<Product> = JSON.parse(sessionStorage.getItem("cart")!);
  allProducts:Array<Product> =[];
  constructor(public ser:ProductService, public cart_ser:CartService, public router:Router) { }

  ngOnInit(): void {
    //load products
    this.ser.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));
  }
  
  pushToCart(product:any){
    // this.cart_ser.addToCart(this.cart_ser.getUserID(), product);
    if(this.cart.some(item => item.name === product.name)) {
      let index = this.cart.findIndex(item => item.name === product.name);
      this.cart[index].quantity++;
      console.log(this.cart);
    } else {
      let newProduct = product;
      newProduct.quantity = 1
      this.cart.push(newProduct);
      console.log(this.cart);
    }
    this.updateStoreQuantity(product);
    sessionStorage.setItem("cart", JSON.stringify(this.cart));
  }

  reroute_cart(){
    this.router.navigate(["\cart"]);
  }

  reroute_login(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userName");
    this.router.navigate([""]);
  }

  navigateToProfile(){
    this.router.navigate(["\profilePage"])
  }

  updateStoreQuantity(product:any){
    this.ser.updateStoreQuantity(product, -1); // (product, quantity)
  }

}
