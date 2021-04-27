import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from './user.model'
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(public http:HttpClient) { }

  loadAllUsersDetails():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:9090/user/getAllUserDetails"); 
  }
  
  storeUserDetails(newUser:any){
    this.http.post("http://localhost:9090/user/storeUserDetails", newUser, {responseType: "text"}).
    subscribe(result => console.log(result), error => console.log(error));
  }

  incrementNumOfTries(user:any):any{
    return this.http.put("http://localhost:9090/user/incrementNumOfTries", user, {responseType: 'text'});
  }

  lockUserOut(user:any):any{
    return this.http.put("http://localhost:9090/user/lockUserOut", user, {responseType: 'text'});
  }

  reset(user:any){
    this.http.put("http://localhost:9090/user/reset", user, {responseType: "text"}).
    subscribe(result => console.log(result), error => console.log(error));
  }
  createTicket(user:any){
    this.http.post("http://localhost:9090/ticket/createTicket", user, {responseType: "text"}).
    subscribe(result => console.log(result), error => console.log(error));
  }

  loadAllEmpDetails():Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:9090/emp/getAllEmpDetails");
  }
  loadAllAdminDetails():any{
    return this.http.get("http://localhost:9090/emp/create" ,{responseType: 'text'});
  }
  

}
