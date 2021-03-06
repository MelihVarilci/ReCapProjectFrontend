import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/details/customerDetail';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  customerDetail: CustomerDetail;
  currentCustomerEmail: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.setCurrentCustomerEmail();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.currentCustomerEmail, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  setCurrentCustomerEmail() {
    this.localStorageService.getCurrentCustomer()
      ? (this.currentCustomerEmail = this.localStorageService.getCurrentCustomer().email)
      : null;
  }

  login() {
    if (this.loginForm.invalid) {
      this.toastrService.warning('Lütfen boş alan bırakmayınız', 'Dikkat');
      return;
    }
    let loginModel: LoginModel = Object.assign({}, this.loginForm.value);

    this.authService.login(loginModel).subscribe(
      (responseSuccess) => {
        this.toastrService.info(responseSuccess.message, 'Giriş Başarılı');
        this.localStorageService.setToken(responseSuccess.data);
        this.getCustomerByEmail(loginModel.email);

      },
      (responseError) => {
        return this.toastrService.error(responseError.error, 'Hata');
      }
    );
  }

  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe((response) => {
      this.customerDetail = response.data;
      this.localStorageService.setCurrentCustomer(this.customerDetail);
      window.location.replace('/cars');
    });
  }
}
