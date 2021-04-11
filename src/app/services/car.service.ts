import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car, CarDetail } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(brandId: number, colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getcardetailbrandandcolorid?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByCarId(carId: number): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  add(car: Car): Observable<ListResponseModel<Car>> {
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl + "cars/add", car);
  }

  update(car: Car): Observable<ListResponseModel<Car>> {
    return this.httpClient.post<ListResponseModel<Car>>(this.apiUrl + "cars/update", car);
  }
}
