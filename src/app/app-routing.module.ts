import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/brand/:brandId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/color/:colorId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"brand/add", component:BrandListComponent},
  {path:"color/add", component:ColorListComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"payment/:rental", component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
