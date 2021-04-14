import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { Rental } from '../models/entities/rental';
import { ResponseModel } from '../models/responses/responseModel';
import { RentalDetail } from '../models/details/rentalDetail';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = environment.baseUrl;
  rentingCar: Rental;

  constructor(private httpClient: HttpClient) {
    this.getRental();
  }

  getRental(): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetail';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalByCarId(carId: number): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetailbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  getRentalByCustomerId(customerId: number): Observable<ListResponseModel<RentalDetail>> {
    let newPath = this.apiUrl + 'rentals/getrentaldetailbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  addRental(rental: Rental) {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentingCar() {
    return this.rentingCar;
  }

  isCarAvailable(carId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/iscaravailable?carId=' + carId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
