import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandName: ['', [Validators.required,Validators.minLength(2)]],
      colorName: ['', [Validators.required,Validators.minLength(2)]],
      carModelYear: [0, [Validators.required, Validators.min(1950)]],
      carDailyPrice: [0,[Validators.required, Validators.min(0)]],
      carDescription: ['',[Validators.required]],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı!');
        },
        (responseError) => {
          if (responseError.error.ValudationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValudationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValudationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
            this.toastrService.error(
              responseError.error.ValudationErrors,
              "Doğrulama Hatası"
            );
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz Eksik','Dikkat!')
    }
  }
}
