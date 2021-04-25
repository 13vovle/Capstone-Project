import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  allEmps: Array<Employee> = [];
  addEmp = false;
  removeEmp = false;

  constructor(public router: Router, public empSer: EmployeeService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  logout() {
    sessionStorage.removeItem("admin");
    this.router.navigate([""]);
  }

  addEmployee(empRef: any) {
    empRef.pass = "NewPass123";
    this.empSer.addEmployee(empRef);
  }

  deleteEmployee(empRef: any) {
    this.empSer.deleteEmployee(empRef.empID);
  }

  loadAllEmployees() {
    this.empSer.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
  }

  showHideSection(flag: string) {
    if (flag == "addEmp") {
      this.addEmp = !this.addEmp;
    } else if (flag == "removeEmp") {
      this.removeEmp = !this.removeEmp;
    }
  }
}
