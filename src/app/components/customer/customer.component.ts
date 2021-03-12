import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';
import { CustomerResponseModel } from 'src/app/models/customerResponseModel';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers:Customer[] = [];
  dataLoaded=false;

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data;
      this.dataLoaded = true;
    })
  }

}
