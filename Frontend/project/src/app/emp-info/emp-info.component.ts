import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrls: ['./emp-info.component.css']
})
export class EmpInfoComponent implements OnInit {
  public adminName = sessionStorage.getItem("empName");
  allEmps: Array<Employee> = [];
  addEmp: boolean = false;
  addEmpMsg?: string;
  removeEmp: boolean = false;
  msg:any = ''

  constructor(public router: Router, public empSer: EmployeeService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }
  logout() {
    if(confirm("Are you sure you want to log out?")){
      sessionStorage.removeItem("admin");
    this.router.navigate([""]);
    }else{
      this.router.navigate(["/empInfo"]); 
    }
  }
  loadAllEmployees() {
    this.empSer.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
  }
  addEmployee(empRef: any) {
    console.log(empRef);
    let emailMatch = false;
    for (var emp of this.allEmps) {
      if (empRef.email == emp.email) {
        emailMatch = true;
        this.addEmpMsg = "This email is already registered to an employee account."
      }
    }
    if (!emailMatch) {
      this.empSer.addEmployee(empRef).subscribe(result => console.log(result), error => console.log(error));
      alert("Employee added successfully!")
      this.loadAllEmployees();
    }
  }
  deleteEmployee(empRef: any) {
    if (confirm("Are you sure to delete this employee")) {
      this.empSer.deleteEmployee(empRef.empID).subscribe(result => console.log(result), error => console.log(error));
      alert("Employee deleted successfully!")
      this.loadAllEmployees();
    }
  }
  showHideSection(flag: string) {
    if (flag == "addEmp") {
      this.addEmp = !this.addEmp;
    } else if (flag == "removeEmp") {
      this.removeEmp = !this.removeEmp;
    }
  }
}
