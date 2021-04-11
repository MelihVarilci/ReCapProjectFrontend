import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/register';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/login', loginModel);
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/register', registerModel);
  }

  update(customer: Customer): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'auth/update', customer);
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getToken();
  }
}
