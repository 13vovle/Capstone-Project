import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http: HttpClient) { }

  addEmployee(newEmp: any) {
    this.http.post("http://localhost:9090/emp/addEmployee", newEmp, { responseType: "text" }).
      subscribe(result => console.log(result), error => console.log(error));
  }

  deleteEmployee(empID: string) {
    return this.http.delete("http://localhost:9090/emp/deleteEmployeeByID/" + empID, { responseType: 'text' }).
      subscribe(result => console.log(result), error => console.log(error));
  }
}
