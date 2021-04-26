import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http:HttpClient) { }
  loadProductDetails():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:9090/product/getAllProductsDetails");
  }
  addProduct(product:any):any{
    this.http.post("http://localhost:9090/product/addProduct", product, {responseType: "text"}).
    subscribe(result => console.log(result), error => console.log(error));
  }
}
