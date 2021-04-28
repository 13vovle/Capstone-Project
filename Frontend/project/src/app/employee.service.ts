 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { Employee } from './employee.model';
import { ProductReq } from './productReq.model';
import {Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "http://localhost:9090/emp/";
  private urlTik = "http://localhost:9090/ticket/";
  constructor(public http: HttpClient) { }

  addEmployee(newEmp: any) {
    this.http.post(this.url + "addEmployee", newEmp, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  deleteEmployee(empID: string) {
    return this.http.delete(this.url + "deleteEmployeeByID/" + empID, { responseType: 'text' }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  updateEmployee(emp: any): Observable<Employee> {
    return this.http.put<Employee>(this.url + "updateEmpDetails", emp)
  }

  getEmpById(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.url + "getEmpByID/" + id)
  }

  loadAllEmpDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>("http://localhost:9090/emp/getAllEmpDetails");
  }

  addProduct(newProd: any){
    this.http.post(this.url + "addProduct", newProd, { responseType: "text" }).
    subscribe(result => console.log(result), error => console.log(error));
  }

  updateProduct(newProd: any){
    this.http.patch(this.url + "updateProduct/"+newProd.Id, newProd, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  deleteProduct(prodRef:any){
    return this.http.delete(this.url + "deleteProduct/" + prodRef.Id, { responseType: 'text' }).
      subscribe(result => console.log(result), error => console.log(error));
  }
  loadAllRequests():Observable<ProductReq[]> {
    return this.http.get<ProductReq[]>(this.url + "getAllRequests");
  }

  loadAllTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>("http://localhost:9090/ticket/getTickets");
  } 
  updateTicket(tid: any): Observable<Ticket> {
    console.log(tid )
    return this.http.put<Ticket>(this.urlTik + "updateTicket", tid)
  }

}
