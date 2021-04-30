import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { Product } from './product.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  id = sessionStorage.getItem("user");
  user: any;
  u: any;
  userCart: Array<Product> = [];

  private url = "http://localhost:9090/";

  constructor(public http: HttpClient) { }

  setUserID(user: any) {
    this.id = user._id;
  }

  getUserID(): any {
    return this.id;
  }

  addToCart(id: any, product: any) {
    let isThere: boolean = false;
    this.getUser(this.getUserID()).
      subscribe(result => {
        this.u = result;
        this.userCart = this.u?.cart;
        console.log(this.userCart)
        console.log(isThere)
        for (let p of this.userCart) {
          if (p._id == product._id) {
            this.http.put(this.url + "user/updateQuantity/" + id, product, { responseType: "text" }).
              subscribe(result => console.log(result), error => console.log(error));
            isThere = true;
            break;
          }
        }
        if (!isThere) {
          this.http.put(this.url + "user/addToCart/" + id, product, { responseType: "text" }).
            subscribe(result => console.log(result), error => console.log(error));
        }
      }, error => console.log(error));
  }

  getUser(id: any): Observable<User> {
    return this.http.get<User>(this.url + "user/loadUser/" + id);
  }

  updateStoreQuantityN(product: any, num: number) {
    this.http.put(this.url + "user/updateQuantityN/:num", product);
  }

  delete(product: any, id: number) {
    let cart: Array<Product> = [];
    this.getUser(this.getUserID()).
      subscribe(result => {
        this.u = result;
        cart = this.u?.cart;
        for (let p of cart) {
          if (p._id == product._id) {
            console.log(cart.indexOf(p));
            cart.splice(cart.indexOf(p), 1)
            break;
          }
        }
        console.log(cart);
        this.emptyCart(this.u);
        this.pushNewCart(cart);
      }, error => console.log(error));
  }

  total = 0;
  checkout(cart: any) {
    this.http.post(this.url + "user/checkout/" + this.getUserID(), cart, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
    this.emptyCart(this.u);
  }

  emptyCart(user: any) {
    this.http.put(this.url + "user/emptyCart/" + this.getUserID(), user, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  decreaseFund(cart: any): any {
    let userId = sessionStorage.getItem('user');
    return this.http.put(this.url + "user/decreaseFund/" + userId, cart, { responseType: "text" });
  }

  pushNewCart(products: any) {
    this.http.put(this.url + "user/pushNewCart/" + this.getUserID(), products, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }
  
  getOrdersByDate(begin: Date, end: Date): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "emp/getOrdersByDates/" + begin + "/" + end);
  }
}
