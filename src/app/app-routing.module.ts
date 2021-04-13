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
      { path: "cardetail/:carId", component: CarDetailComponent },

      { path: "add", component: CarAddComponent, canActivate: [LoginGuard] },
    ]
  },
  {
    path: "auth", children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "profile", component: ProfileComponent },
      { path: "rentals", component: RentalManagementComponent },
    ]
  },

  { path: "brand/list", component: BrandListComponent, canActivate: [LoginGuard] },
  { path: "color/list", component: ColorListComponent, canActivate: [LoginGuard] },

  { path: "rental/:carId", component: RentalComponent },
  { path: "payment/:rental", component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
