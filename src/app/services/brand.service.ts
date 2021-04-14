import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/entities/brand';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/add";
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  updateBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/update";
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  deleteBrand(brand: Brand): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/delete";
    return this.httpClient.post<ResponseModel>(newPath, brand)
  }

  deleteByBramdId(brandId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + "brands/deletebyid?brandId=" + brandId;
    return this.httpClient.post<ResponseModel>(newPath, null)
  }
}
