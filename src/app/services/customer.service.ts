import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetail';
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerById(customerId: number): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetailbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerByEmail(email: string): Observable<ListResponseModel<Customer>> {
    let newPath = this.apiUrl + 'customers/getcustomerbyemail?email=' + email;
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

}
