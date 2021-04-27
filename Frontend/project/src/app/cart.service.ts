import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  id:any;
  constructor(public http:HttpClient) { }
  setUserID(user:any){
    this.id = user._id;
  }
  getUserID():any{
    return this.id;
  }

  addToCart(id:any, product:any){
    this.http.put("http://localhost:9090/user/addToCart/" + id, product);
  }
}
