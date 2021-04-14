import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { CustomerDetail } from '../models/details/customerDetail';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetail';
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerById(customerId: number): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'customers/getcustomerdetailbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }

  getCustomerByEmail(email: string): Observable<SingleResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + 'customers/getcustomerbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath);
  }

}
