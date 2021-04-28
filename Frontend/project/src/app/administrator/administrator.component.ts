import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ProductReq } from '../productReq.model';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  allEmps: Array<Employee> = [];
  allProducts: Array<Product> = [];
  allRequests: Array<ProductReq> = [];
  addEmp: boolean = false;
  addEmpMsg?: string;
  removeEmp: boolean = false;
  removeEmpMsg?: string;
  addProduct: boolean = false;
  updateProduct: boolean = false;
  removeProduct: boolean = false;

  constructor(public router: Router, public empSer: EmployeeService, public prodSer: ProductService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
    this.loadAllProducts();
    this.loadAllRequests();
  }

  logout() {
    sessionStorage.removeItem("admin");
    this.router.navigate([""]);
  }

  addEmployee(empRef: any) {
    console.log(empRef);
    let emailMatch = false;
    for (var emp of this.allEmps) {
      if (empRef.email == emp.email) {
        emailMatch = true;
        this.addEmpMsg = "This email is already registered to an employee account."
      }
    }
    if (!emailMatch) {
      this.empSer.addEmployee(empRef).subscribe(result => this.addEmpMsg = result, error => console.log(error));
      this.loadAllEmployees();
    }
  }

  deleteEmployee(empRef: any) {
    if (confirm("Are you sure to delete this employee")) {
      this.empSer.deleteEmployee(empRef.empID).subscribe(result => this.removeEmpMsg = result, error => console.log(error));
      this.loadAllEmployees();
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
  addProductFunc(productRef: any) {
    //console.log(productRef);
    this.empSer.addProduct(productRef);
  }
  updateProductFunc(productRef: any) {
    //console.log(productRef);
    this.empSer.updateProduct(productRef);
  }
  deleteProductFunc(delProdRef: any) {
    //console.log(delProdRef)
    this.empSer.deleteProduct(delProdRef);
  }
  showHideSection(flag: string) {
    if (flag == "addEmp") {
      this.addEmp = !this.addEmp;
    } else if (flag == "removeEmp") {
      this.removeEmp = !this.removeEmp;
    } else if (flag == 'addProduct') {
      this.addProduct = !this.addProduct
    } else if (flag == 'updateProduct') {
      this.updateProduct = !this.updateProduct
    } else if (flag == 'removeProduct') {
      this.removeProduct = !this.removeProduct
    }
  }
}
