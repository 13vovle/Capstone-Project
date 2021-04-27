import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  allEmps: Array<Employee> = [];
  allProducts: Array<Product> = [];
  addEmp: boolean = false;
  removeEmp: boolean = false;
  addProduct: boolean = false;
  updateProduct: boolean = false;

  constructor(public router: Router, public empSer: EmployeeService, public prodSer: ProductService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
    this.loadAllProducts();
  }

  logout() {
    sessionStorage.removeItem("admin");
    this.router.navigate([""]);
  }

  addEmployee(empRef: any) {
    this.empSer.addEmployee(empRef);
    this.loadAllEmployees();
  }

  deleteEmployee(empRef: any) {
    this.empSer.deleteEmployee(empRef.empID);
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.empSer.loadAllEmpDetails().subscribe(result => this.allEmps = result, error => console.log(error));
  }

  loadAllAdmins() {

  }

  loadAllProducts() {
    this.prodSer.loadProductDetails().subscribe(result => this.allProducts = result, error => console.log(error));

  }

  addProductFunc(productRef: any) {
    //console.log(productRef);
    this.empSer.addProduct(productRef);
  }
  updateProductFunc(productRef: any) {
    console.log(productRef);
    this.empSer.updateProduct(productRef);

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
    }
  }
}
