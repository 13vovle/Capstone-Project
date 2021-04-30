import { Component, OnInit } from '@angular/core';
import{ProductService} from "../product.service"

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {

  orders : any = [];
  hasData: boolean = false;
  errors : any = [];
  newOrderList : any = [];
  public uname : any;

  constructor(public Service:ProductService ) { }

  ngOnInit(): void {

    this.uname = sessionStorage.getItem("empName");

    this.Service.getAllOrders().subscribe(data => {
      if(data)
      {  
        this.orders = data;
        for(let order of this.orders)
        {
          let pname = "";
          for(let prod of order.product)
          {
            pname += prod.name + ', '
          }
          order["productsList"] = pname.slice(0, -2);
        }
        this.hasData = true; 
      }
    },
    (errorResponse) => {
      this.errors.push(errorResponse.error.error);
    });
  }

  updateOrderStatus(ord: any, status: any, comment : any){
    console.log(ord);
    console.log(status);
    console.log(comment);
    ord.status = status;
    let formdata = ord;
    formdata["comment"] = comment;
      this.Service.updateOrder(formdata).subscribe((data) => {
     alert("Order Status Changed");
      location.reload();
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