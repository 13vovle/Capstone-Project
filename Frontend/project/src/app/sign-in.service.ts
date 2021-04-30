import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from './user.model'
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private url = "http://localhost:9090/"

  constructor(public http: HttpClient) { }

  loadAllUsersDetails(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "user/getAllUserDetails");
  }

  storeUserDetails(newUser: any) {
    return this.http.post(this.url + "user/storeUserDetails", newUser, { responseType: "text" });
  }

  incrementNumOfTries(user: any): any {
    return this.http.put(this.url + "user/incrementNumOfTries", user, { responseType: 'text' });
  }

  lockUserOut(user: any): any {
    return this.http.put(this.url + "user/lockUserOut", user, { responseType: 'text' });
  }

  reset(user: any) {
    this.http.put(this.url + "user/reset", user, { responseType: "text" });
  }

  createTicket(user: any) {
    this.http.post(this.url + "ticket/createTicket", user, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  loadAllEmpDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + "emp/getAllEmpDetails");
  }
  
  loadAllAdminDetails(): any {
    return this.http.get(this.url + "emp/create", { responseType: 'text' });
  }
}
