import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeCard } from '../models/fakeCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class FakecardService {
  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44352/api/';

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
