import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { FakecardService } from 'src/app/services/fakecard.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  cars: Car;
  rental: Rental;
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number = 0;
  fakeCard: FakeCard;
  cardExist: Boolean = false;
  cardAddForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakecardService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.createCardAddForm();
        this.rental = JSON.parse(params['rental']);
        this.getCarDetail();
      }
    });
  }

  getCarDetail() {
    this.carService
      .getCarDetailsByCarId(this.rental.carId)
      .subscribe((response) => {
        this.cars = response.data[0];
        this.paymentCalculator();
      });
  }

  createCardAddForm() {
    this.cardAddForm = this.formBuilder.group({
      customerId: [this.localStorageService.getCurrentCustomer().customerId, [Validators.required]],
      nameOnTheCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      cardCvv: ['', [Validators.required]],
      save: [true],
    });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.cars.carDailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  add() {
    if (this.cardAddForm.invalid) {
      return this.toastrService.warning('Bilgilerinizi kontrol ediniz', 'Dikkat');
    }
    if (this.cardAddForm.value.save) {
      delete this.cardAddForm.value.save;
      this.fakeCard = Object.assign({}, this.cardAddForm.value);
    }
    return this.addRental(this.rental);
  }

  addRental(rental: Rental) {
    this.rentalService.addRental(rental).subscribe(responseSuccess => {
      this.toastrService.success(responseSuccess.message, 'Başarılı');
      return this.router.navigate(['']);
    }, responseError => {
      if (responseError.error.ValidationErrors) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }
        return false;
      }
      this.toastrService.error(responseError.error.message, 'Hata');
      return false;
    });
  }

  addCard(card: FakeCard) {
    this.fakeCardService.add(card).subscribe(responseSuccess => {
      return responseSuccess.success
    }, responseError => {
      if (responseError.error.ValidationErrors.length > 0) {
        for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
            responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
        }
        return;
      }
      this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
      return;
    });
  }

  setSelectedCard(cardOnEventing: FakeCard) {
    this.fakeCard = Object.assign(cardOnEventing, { save: false });
    this.cardAddForm.setValue(this.fakeCard);
  }
}