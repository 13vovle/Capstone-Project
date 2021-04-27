import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
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


  constructor(public service:EmployeeService, public route : Router) { }

  ngOnInit(): void {

    this.empID = "07ca84a6-8281-4d02-aab4-ab392149d4bb";
    this.service.getEmpById(this.empID).subscribe(data => {
      this.empDetails = data;
      console.log(this.empDetails);
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
    
  }

  frmData(data: any){
    
    this.empDetails.hashedPassword = data.pwd;
    console.log(this.empDetails)
    this.service.updateEmployee(this.empDetails).subscribe(data => {
      console.log("Data Inserted");
      this.route.navigateByUrl("/sign-up")
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

}
