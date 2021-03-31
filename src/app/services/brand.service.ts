import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44352/api/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/delete";
    return this.httpClient.post<ResponseModel>(newPath,brand)
  }
}
