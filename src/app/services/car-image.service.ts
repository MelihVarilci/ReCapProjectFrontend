import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl="https://localhost:44352/api/";

  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + "carimages/getcarimagesbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

}
