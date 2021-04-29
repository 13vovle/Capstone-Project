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
  public uname : any;

  constructor(public Service: EmployeeService) { }

  ngOnInit(): void {

    this.uname = sessionStorage.getItem("empName");

    this.Service.loadAllTickets().subscribe(data => {
      let locked =  data.find(t => t.isLockedOut == true);
      if(locked)
      {
        this.hasData = true; 
      }
      if(data){
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
    this.Service.updateTicket(tic).subscribe((res) => {
      console.log("Ticket Inserted");
      location.reload();
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });

    //location.reload();

  }

  logout() {
    sessionStorage.removeItem("employee");
    sessionStorage.removeItem("empName");
  }

}
