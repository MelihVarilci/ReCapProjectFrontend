import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalManagementComponent } from './components/rental-management/rental-management.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"cars"},
  {path:"cars", component:CarComponent},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/cars/cardetail/:carId", component:CarDetailComponent},
  {path:"cars/brand/:brandId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/color/:colorId/cars/cardetail/:carId", component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"brand/add", component:BrandListComponent, canActivate:[LoginGuard]},
  {path:"color/add", component:ColorListComponent, canActivate:[LoginGuard]},
  {path:"rental/:carId", component:RentalComponent},
  {path:"payment/:rental", component:PaymentComponent},
  {path:"auth/login", component:LoginComponent},
  {path:"auth/register", component:RegisterComponent},
  {path:"auth/profile", component:ProfileComponent},
  {path:"auth/rentals", component:RentalManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
