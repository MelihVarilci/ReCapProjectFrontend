import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl + "colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  addColor(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "colors/add";
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  updateColor(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "colors/update";
    return this.httpClient.post<ResponseModel>(newPath, color)
  }

  deleteColor(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + "colors/delete";
    return this.httpClient.post<ResponseModel>(newPath, color)
  }
}
