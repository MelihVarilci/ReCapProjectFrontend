import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/details/customerDetail';
import { RentalDetail } from 'src/app/models/details/rentalDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  customerToUpdate: CustomerDetail;
  customerUpdateForm: FormGroup;
  rentals: RentalDetail[] = [];
  returnDate: Date;
  step = 0;

  constructor(
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getRentalByCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer() {
    this.customerToUpdate = this.localStorageService.getCurrentCustomer();
  }

  getRentalByCustomer() {
    this.rentalService.getRentalByCustomerId(this.customerToUpdate.customerId).subscribe(
      (responseSuccess) => {
        this.rentals = responseSuccess.data;
        this.returnDate = (responseSuccess.data[0].returnDate);
      })
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

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  addFoto() {
    document.getElementById("addFotograph").click();
  }
  setFindexColor() {
    if (this.customerToUpdate.findexPoint < 100) {
      return "color:red;";
    }
    return "color:green;";
  }
  setReturnDateColor() {
    let now = new Date();
    if (this.returnDate > now) {
      return "color: green;";
    }
    return "color:red;";
  }
}
