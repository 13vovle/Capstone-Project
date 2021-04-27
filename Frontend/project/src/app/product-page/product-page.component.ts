import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  allProducts:Array<Product> =[];
  constructor(public ser:ProductService, public router:Router) { }

  ngOnInit(): void {
    //load products
    this.ser.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));
  }

  reroute_cart(){
    this.router.navigate(["\cart"]);
  }

  reroute_login(){
    sessionStorage.removeItem("user");
    this.router.navigate([""]);
  }
}
