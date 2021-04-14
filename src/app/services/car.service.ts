import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/entities/car';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { environment } from "src/environments/environment";
import { CarDetail } from '../models/details/carDetail';
import { SingleResponseModel } from '../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(brandId: number, colorId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbrandandcolorid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId: number): Observable<SingleResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ListResponseModel<Car>> {
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl + "cars/add", car);
  }

  update(car: Car): Observable<ListResponseModel<Car>> {
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl + "cars/update", car);
  }
}
