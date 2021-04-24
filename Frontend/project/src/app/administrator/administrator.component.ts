import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(public router: Router, public empSer: EmployeeService) { }

  ngOnInit(): void { }

  logout() {
    sessionStorage.removeItem("admin");
    this.router.navigate([""]);
  }

  addEmployee(empRef: any) {
    empRef.pass = "NewPass123";
    console.log(empRef);
    this.empSer.addEmployee(empRef);
  }
}
