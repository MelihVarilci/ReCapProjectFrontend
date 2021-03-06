import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/details/customerDetail';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  customerDetail: CustomerDetail;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.toastrService.warning('Lütfen boş alan bırakmayınız', 'Dikkat');
      return;
    }
    if (
      this.registerForm.value['password'] !=
      this.registerForm.value['confirmPassword']
    ) {
      this.toastrService.error('Şifreler uyuşmuyor', 'Hata');
      return;
    }
    delete this.registerForm.value['confirmPassword'];
    let registerModel: RegisterModel = Object.assign({},this.registerForm.value);
    this.authService.register(registerModel).subscribe(
      (responseSuccess) => {
        this.localStorageService.setToken(responseSuccess.data);
        this.getCustomerByEmail(registerModel.email);
        this.toastrService.success(responseSuccess.message, 'Başarılı');

        return this.router.navigate(['/cars']);
      },
      (responseError) => {
        if (responseError.error.ValidationErrors) {
          for (
            let i = 0;
            i < responseError.error.ValidationErrors.length;
            i++
          ) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama Hatası'
            );
          }
          return;
        }
        this.toastrService.error(
          responseError.status + ' ' + responseError.name,
          responseError.error
        );
      }
    );
  }

  getCustomerByEmail(email: string) {
    this.customerService
      .getCustomerByEmail(email)
      .subscribe((responseSuccess) => {
        this.customerDetail = responseSuccess.data;
        this.localStorageService.setCurrentCustomer(this.customerDetail);
      });
  }
}
