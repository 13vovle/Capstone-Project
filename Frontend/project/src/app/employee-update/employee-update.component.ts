import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

 empID:any
 empDetails : any;
 errors : any = [];
 public uname : any;

  constructor(public service:EmployeeService, public route : Router) { }

  ngOnInit(): void {

    this.uname = sessionStorage.getItem("empName");

    this.empID = sessionStorage.getItem("employee");
    
    //this.empID = "07ca84a6-8281-4d02-aab4-ab392149d4bb";
    if(this.empID)
    {
      this.service.getEmpById(this.empID).subscribe(data => {
        this.empDetails = data;
        console.log(this.empDetails);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      });
    }
    else
    {
      alert("employee ID not available");
    }
    
    
  }

  frmData(data: any){
    
    this.empDetails.hashedPassword = data.pwd;
    console.log(this.empDetails)
    this.service.updateEmployee(this.empDetails).subscribe(data => {
      console.log("Data Inserted");
      alert("Password Changed Successfully")
      this.route.navigateByUrl("/empRequest")
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

  logout() {
    sessionStorage.removeItem("employee");
    sessionStorage.removeItem("empName");
  }

}
