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

  allProducts:Array<Product> =[];
  constructor(public ser:ProductService, public cart_ser:CartService, public router:Router) { }

  ngOnInit(): void {
    //load products
    this.ser.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));
  }
  
  pushToCart(product:any){
    this.cart_ser.addToCart(this.cart_ser.getUserID(), product);
    this.updateStoreQuantity(product);
  }

  reroute_cart(){
    this.router.navigate(["\cart"]);
  }

  reroute_login(){
    sessionStorage.removeItem("user");
    this.router.navigate([""]);
  }

  navigateToProfile(){
    this.router.navigate(["\profilePage"])
  }

  updateStoreQuantity(product:any){
    this.ser.updateStoreQuantity(product, -1);
  }

}
