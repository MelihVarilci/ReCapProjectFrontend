import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  customers: Customer[];
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  @Input() car: Car;
  dataLoaded = false;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
      this.dataLoaded = true;
    });
  }
  // event.toISOString()
  //> "2011-10-05T14:48:00.000Z"
  // event.toISOString().slice(0,10)
  //> "2011-10-05"
  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  createRental() {
    let MyRental: Rental = {
      carId: this.car.carId,
      brandName: this.car.brandName,
      colorName: this.car.colorName,
      carModelYear: this.car.carModelYear,
      carDailyPrice: this.car.carDailyPrice,
      carDescription: this.car.carDescription,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error("Eksik bilgi girdiniz","Bilgilerinizi kontrol edin")
    } else{
      this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
}
