import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from './user.model'
import { Order } from './order.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  loadUsersDetails(id:any):Observable<User>{
    return this.http.get<User>("http://localhost:9090/user/getUserDetailsById/" + id); 
  }

  updateProfile(profileRef: any){
      let userId = sessionStorage.getItem('user');
      this.http.patch("http://localhost:9090/user/updateProfile/"+userId, profileRef,{ responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  transferFunds(transfer:number) {
    let userId = sessionStorage.getItem('user');
    let data = {id:userId, transfer:transfer};
    this.http.put("http://localhost:9090/user/transferFunds/", data,{ responseType: "text" }).
    subscribe(result => console.log(result), error => console.log(error));
  }

  getOrderDetails(userId:any):Observable<Order[]>{
    return this.http.get<Order[]>("http://localhost:9090/user/getOrderDetails/"+ userId);
  }

  deleteOrder(order:any):any{
    let orderId = order._id;
    return this.http.delete("http://localhost:9090/user/deleteOrder/" + orderId, {responseType: "text"});
  }

  increaseFunds(order:any):any{
    let userId = sessionStorage.getItem('user');
    return this.http.put("http://localhost:9090/user/increaseFunds/" + userId, order, {responseType: "text"});
  }
}
