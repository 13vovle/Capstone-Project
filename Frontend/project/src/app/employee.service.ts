import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { Employee } from './employee.model';
import { ProductReq } from './productReq.model';
import { Ticket } from './ticket.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = "http://localhost:9090/";

  constructor(public http: HttpClient) { }

  addEmployee(newEmp: any) {
    return this.http.post(this.url + "emp/addEmployee", newEmp, { responseType: "text" });
  }

  deleteEmployee(empID: string) {
    return this.http.delete(this.url + "emp/deleteEmployeeByID/" + empID, { responseType: 'text' });
  }

  updateEmployee(emp: any): Observable<Employee> {
    return this.http.put<Employee>(this.url + "emp/updateEmpDetails", emp)
  }

  getEmpById(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.url + "emp/getEmpByID/" + id)
  }

  loadAllEmpDetails(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + "emp/getAllEmpDetails");
  }

  addProduct(newProd: any) {
    this.http.post(this.url + "emp/addProduct", newProd, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  updateProduct(newProd: any) {
    this.http.patch(this.url + "emp/updateProduct/" + newProd.Id, newProd, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  deleteProduct(prodRef: any) {
    return this.http.delete(this.url + "emp/deleteProduct/" + prodRef.Id, { responseType: 'text' }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  loadAllRequests(): Observable<ProductReq[]> {
    return this.http.get<ProductReq[]>(this.url + "emp/getAllRequests");
  }

  loadAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url + "ticket/getTickets");
  }

  updateTicket(tid: any): Observable<Ticket> {
    console.log(tid)
    return this.http.put<Ticket>(this.url + "ticket/updateTicket", tid)
  }
}
