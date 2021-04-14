import { Injectable } from '@angular/core';
import { CustomerDetail } from '../models/details/customerDetail';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  tokenKey: string = 'token';
  currentCustomer: string = 'currentCustomer';

  constructor() { }

  setToken(tokenValue: TokenModel) {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenValue));
  }

  getToken(): TokenModel {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  setCurrentCustomer(currentCustomerValue: CustomerDetail) {
    localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
  }

  getCurrentCustomer(): CustomerDetail {
    return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  removeCurrentCustomer() {
    localStorage.removeItem(this.currentCustomer);
  }
}
