import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RentalManagementComponent } from './components/auth/rental-management/rental-management.component';
import { RentalComponent } from './components/car/car-detail/rental/rental.component';
import { LoginGuard } from "./guards/login.guard";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "cars" },
  {
    path: 'cars', children: [
      { path: "", component: CarComponent },
      { path: "brand/:brandId", component: CarComponent },
      { path: "color/:colorId", component: CarComponent },
      { path: "brand/:brandId", component: CarComponent },
      { path: "color/:colorId", component: CarComponent },
      { path: "brand/:brandId/color/:colorId", component: CarComponent },
      { path: "brand/:brandId/cars/cardetail/:carId", component: CarComponent },
      { path: "color/:colorId/cars/cardetail/:carId", component: CarComponent },

      { path: "update/:carId", component: CarUpdateComponent },

      { path: "add", component: CarAddComponent, canActivate: [LoginGuard] },
    ]
  },
  {
    path: "auth", children: [
      { path: "rentals", component: RentalManagementComponent },
      { path: "register", component: RegisterComponent },
      { path: "profile", component: ProfileComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  
  { path: "brand/list", component: BrandListComponent, canActivate: [LoginGuard] },
  { path: "color/list", component: ColorListComponent, canActivate: [LoginGuard] },
  
  { path: "cardetail/:carId", component: CarDetailComponent },
  { path: "payment/:rental", component: PaymentComponent },
  { path: "rental/:carId", component: RentalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
