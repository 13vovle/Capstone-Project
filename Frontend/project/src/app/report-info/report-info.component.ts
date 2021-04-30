import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Order } from '../order.model';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductReq } from '../productReq.model';

@Component({
  selector: 'app-report-info',
  templateUrl: './report-info.component.html',
  styleUrls: ['./report-info.component.css']
})
export class ReportInfoComponent implements OnInit {
  public adminName = sessionStorage.getItem("empName");
  orderReport: Array<Order> = [];
  productReport: Array<Product> = [];
  allEmps: Array<Employee> = [];
  allProducts: Array<Product> = [];
  allRequests: Array<ProductReq> = [];
  msg:any = ''

  constructor(public router: Router, public empSer:EmployeeService,public cartSer: CartService, public prodSer: ProductService) { }

  ngOnInit(): void {
  }
  logout() {
    if(confirm("Are you sure tou want to log out?")){
      sessionStorage.removeItem("admin");
    this.router.navigate([""]);
    }else{
      this.router.navigate(["/generateReport"]); 
    }
  }
  loadAllEmployees() {
    this.empSer.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
  }

  loadAllProducts() {
    this.prodSer.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));
  }
  loadAllRequests() {
    this.empSer.loadAllRequests().subscribe(result => this.allRequests = result, error => console.log(error));
  }
  async generateReport(genReportRef: any) {
    // console.log(genReportRef)
    this.orderReport = await this.cartSer.getOrdersByDate(genReportRef.begin, genReportRef.end).toPromise();
    this.productReport = [];
    this.productReportInfo();
    alert('Report generated!')
  }
  productReportInfo() {
    for (var order of this.orderReport) {
      for (var product of order.product) {
        let found = false;
        for (var item of this.productReport) {
          if (item._id == product._id) {
            item.quantity = item.quantity + product.quantity;
            found = true;
          }
        }
        if (!found) {
          this.productReport.push(product);
        }
      }
    }
  }
}
