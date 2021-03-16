import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44352/api/";
  
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getbycolorid?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailbrandandcolorid?brandId=+" + brandId + "&colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
