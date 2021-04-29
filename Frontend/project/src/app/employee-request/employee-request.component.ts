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
  currentquantity : Number = 0;
  Message : string = "";
  uname : any = "";

  constructor(public Service:ProductService) { }

  ngOnInit(): void {

    this.uname = sessionStorage.getItem("empName");
    this.Service.getProductDetails().subscribe(data => {
      this.products = data;
      console.log(this.products);
    },(errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });

}

  onddchange(event : any){
    let ob = JSON.parse(event.target.value);
    this.currentquantity = ob.quantity;
    console.log(this.currentquantity);
  }

  frmData(req:any){
    let data = JSON.parse(req.productName);
    let fomdata = {
      productName: data.name,
      productId :  data._id,
      quantity: req.quantity,
    }
    this.Service.productReqDetails(fomdata).subscribe((res) => {
      console.log("Request Sent");
      this.Message = "Request Sent Successfully";
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });


}

}
