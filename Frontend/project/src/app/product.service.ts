import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ProductReq } from './productReq.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:9090/"

  constructor(public http: HttpClient) { }

  loadProductDetails(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "emp/getAllProductDetails");
  }

  getProductDetails(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + "product/getAllProductsDetails");
  }

  productReqDetails(req: any): Observable<ProductReq> {
    return this.http.post<ProductReq>(this.url + "product/sendProductsRequest", req);
  }

  updateStoreQuantity(product: any, n: number) {
    return this.http.put(this.url + "product/updateQuantity/" + n, product, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "product/getAllOrders");
  }

  updateOrder(ord: any): Observable<any> {
    return this.http.put<any>(this.url + "product/updateOrder/", ord);
  }
}
