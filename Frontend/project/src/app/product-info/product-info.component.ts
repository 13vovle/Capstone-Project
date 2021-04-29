import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductReq } from '../productReq.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  allProducts: Array<Product> = [];
  allRequests: Array<ProductReq> = [];
  addProduct: boolean = false;
  updateProduct: boolean = false;
  removeProduct: boolean = false;
  msg:any = ''
  constructor(public router: Router, public empSer:EmployeeService, public prodSer: ProductService) { }

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadAllRequests();
  }
  logout() {
    if(confirm("Are you sure tou want to log out?")){
      sessionStorage.removeItem("admin");
    this.router.navigate([""]);
    }else{
      this.router.navigate(["/productInfo"]); 
    }
  }
  loadAllProducts() {
    this.prodSer.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));
  }
  loadAllRequests() {
    this.empSer.loadAllRequests().subscribe(result => this.allRequests = result, error => console.log(error));
  }
  addProductFunc(productRef: any) {
    //console.log(productRef);
    this.empSer.addProduct(productRef)
    alert('Product added successfully!')
  }
  updateProductFunc(productRef: any) {
    //console.log(productRef);
    this.empSer.updateProduct(productRef);
    alert('Product updated successfully!')
  }
  deleteProductFunc(delProdRef: any) {
    //console.log(delProdRef)
    this.empSer.deleteProduct(delProdRef);
    alert('Product deleted successfully!')
  }
  showHideSection(flag: string) {
    if (flag == 'addProduct') {
      this.addProduct = !this.addProduct
    } else if (flag == 'updateProduct') {
      this.updateProduct = !this.updateProduct
    } else if (flag == 'removeProduct') {
      this.removeProduct = !this.removeProduct
    } 
  }
}
