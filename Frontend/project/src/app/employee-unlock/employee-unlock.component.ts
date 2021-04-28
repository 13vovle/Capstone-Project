import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-employee-unlock',
  templateUrl: './employee-unlock.component.html',
  styleUrls: ['./employee-unlock.component.css']
})
export class EmployeeUnlockComponent implements OnInit {
  tickets :any =[];
  errors : any = [];
  hasData : boolean = false;

  constructor(public Service: EmployeeService) { }

  ngOnInit(): void {
    this.Service.loadAllTickets().subscribe(data => {
      if(data){
      this.hasData = true; 
      this.tickets = data;
      console.log(this.tickets);
      }
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }


  UnlockUser(tid: any){
    console.log(tid);
    let tic =  this.tickets.find((t: { _id: any; }) => t._id == tid)
    console.log(tic)
    this.Service.updateTicket(tic).subscribe(data => {
      console.log("Ticket Inserted");
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

}
