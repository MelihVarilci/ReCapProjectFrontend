import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rental } from '../models/entities/rental';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  pay(rental: Rental, amount: number) {
    let path = this.apiUrl + "rentals/paymentadd";
    this.httpClient.post<ResponseModel>(path, { payment: { amount: amount }, rental: rental })
  }
}
