import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FakeCard } from '../models/entities/fakeCard';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root',
})
export class FakecardService {
  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.baseUrl;

  isCardExist(fakeCard: FakeCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'fakecards/iscardexist';
    return this.httpClient.post<ResponseModel>(newPath, fakeCard);
  }

  getCardByNumber(cardNumber: string): Observable<ListResponseModel<FakeCard>> {
    let newPath = this.apiUrl + 'fakecards/getbycardnumber?cardnumber=' + cardNumber;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  add(card: FakeCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "fakecards/add", card);
  }

  getByCustomerId(customerId: number): Observable<ListResponseModel<FakeCard>> {
    let newPath =
      this.apiUrl + 'fakecards/getbycustomerId?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<FakeCard>>(newPath);
  }

  updateCard(fakeCard: FakeCard) {
    let newPath = this.apiUrl + 'fakecards/update';
    this.httpClient.put(newPath, fakeCard);
  }
}
