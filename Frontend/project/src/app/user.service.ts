import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from './user.model'
import { Order } from './order.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:9090/"

  constructor(public http: HttpClient) { }

  loadUsersDetails(id: any): Observable<User> {
    return this.http.get<User>(this.url + "user/getUserDetailsById/" + id);
  }

  updateProfile(profileRef: any) {
    let userId = sessionStorage.getItem('user');
    this.http.patch(this.url + "user/updateProfile/" + userId, profileRef, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  transferFunds(transfer: number) {
    let userId = sessionStorage.getItem('user');
    let data = { id: userId, transfer: transfer };
    this.http.put(this.url + "user/transferFunds/", data, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  getOrderDetails(userId: any): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + "user/getOrderDetails/" + userId);
  }

  deleteOrder(order: any): any {
    let orderId = order._id;
    return this.http.delete(this.url + "user/deleteOrder/" + orderId, { responseType: "text" });
  }

  increaseFunds(order: any): any {
    let userId = sessionStorage.getItem('user');
    return this.http.put(this.url + "user/increaseFunds/" + userId, order, { responseType: "text" });
  }
}
