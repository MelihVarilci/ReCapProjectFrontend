import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customerToUpdate: Customer;
  customerUpdateForm: FormGroup;
  
  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer() {
    this.customerToUpdate = this.localStorageService.getCurrentCustomer();
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      firstName: [this.customerToUpdate.firstName, [Validators.required]],
      lastName: [this.customerToUpdate.lastName, [Validators.required]],
      companyName: [this.customerToUpdate.companyName],
      email: [this.customerToUpdate.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  update() {
    if (this.customerUpdateForm.invalid) {
      this.toastrService.warning('Bilgileri kontrol ediniz', 'Dikkat');
      return;
    }

    if (this.customerUpdateForm.value['password'] != this.customerUpdateForm.value['confirmPassword']) {
      this.toastrService.warning('Şifreler uyuşmuyor', 'Dikkat');
      return;
    }
    delete this.customerUpdateForm.value['confirmPassword'];
    this.customerToUpdate = Object.assign({ ...this.customerToUpdate }, this.customerUpdateForm.value);

    this.authService.update(this.customerToUpdate).subscribe(
      (responseSuccess) => {
        this.localStorageService.removeCurrentCustomer();
        this.localStorageService.setCurrentCustomer(this.customerToUpdate);
        this.toastrService.success("Kullanıcı Güncellendi", 'Başarılı');
        return this.router.navigate(["/cars"]);
      },
      (responseError) => {
        if (responseError.error.ValidationErrors) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası');
          }
          return;
        }
        this.toastrService.error(responseError.error.StatusCode + ' ' + responseError.error.Message, responseError.name);
      }
    );
  }
}
