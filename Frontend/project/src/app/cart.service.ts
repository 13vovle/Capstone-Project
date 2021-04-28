import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  id:any;
  user:any;
  u:any;
  userCart:Array<Product> = [];
  constructor(public http:HttpClient) { }

  setUserID(user:any){
    this.id = user._id;
  }

  getUserID():any{
    return this.id;
  }

  addToCart(id:any, product:any){
    let isThere:boolean = false;
    this.getUser(this.getUserID()).
    subscribe(result => {
      this.u = result;
      this.userCart = this.u?.cart;  
      console.log(this.userCart)  
      console.log(isThere)
      for(let p of this.userCart){
        if(p._id == product._id){
          this.http.put("http://localhost:9090/user/updateQuantity/" + id, product, {responseType: "text"}).
          subscribe(result => console.log(result), error => console.log(error));
          isThere = true;
          break;
        }
      }
  
      if(!isThere){
        this.http.put("http://localhost:9090/user/addToCart/" + id, product, {responseType: "text"}).
        subscribe(result => console.log(result), error => console.log(error));
      }
    }, error => console.log(error));


  }

  getUser(id:any):Observable<User>{
    return this.http.get<User>("http://localhost:9090/user/loadUser/" + id);
  }//

  delete(product:any, id:number){
    let cart:Array<Product> = [];
    this.getUser(this.getUserID()).
    subscribe(result => {
      this.u = result;
      cart = this.u?.cart;
      for(let p of cart){
        if(p._id == product._id){
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

  checkout(){
    this.getUser(this.getUserID()).
    subscribe(result => {
      this.u = result;
      this.userCart = this.u?.cart;    
    }, error => console.log(error));

    this.http.post("http://localhost:9090/user/checkout/"+this.getUserID(), this.userCart, {responseType: "text"}).
    subscribe(result => console.log(result), error => console.log(error));

    this.emptyCart(this.u);
  }

  emptyCart(user:any){
    this.http.put("http://localhost:9090/user/emptyCart/" + this.getUserID(), user, {responseType:"text"}).
    subscribe(result => console.log(result), error =>console.log(error));
  }

  pushNewCart(products:any){
    this.http.put("http://localhost:9090/user/pushNewCart/" + this.getUserID(), products,{responseType:"text"}).
    subscribe(result => console.log(result), error =>console.log(error));
  }
}
