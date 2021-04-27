import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-employee-request',
  templateUrl: './employee-request.component.html',
  styleUrls: ['./employee-request.component.css']
})
export class EmployeeRequestComponent implements OnInit {

  products : any;
  errors : any = [];

  constructor(public Service:ProductService) { }

  ngOnInit(): void {
    this.Service.loadProductDetails().subscribe(data => {
      this.products = data;
      console.log(this.products);
    },(errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });

}
  frmData(req:any){
    this.Service.productReqDetails(req).subscribe(data => {
      console.log("Request Sent");
    
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });


}

}
