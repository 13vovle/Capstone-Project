import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductReq } from './productReq.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http:HttpClient) { }
  loadProductDetails():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:9090/product/getAllProductsDetails");
  }

  productReqDetails(req:any):Observable<ProductReq>{
    return this.http.post<ProductReq>("http://localhost:9090/product/sendProductsRequest", req);
  }



}
