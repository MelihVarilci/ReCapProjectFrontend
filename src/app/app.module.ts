import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { RentalComponent } from './components/car/car-detail/rental/rental.component';
import { NaviComponent } from './components/master/navi/navi.component';
import { CarComponent } from './components/car/car.component';

import { FilterBrandPipePipe } from './pipes/filter-brand-pipe.pipe';
import { FilterColorPipePipe } from './pipes/filter-color-pipe.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';

import { RentalManagementComponent } from './components/auth/rental-management/rental-management.component';
import { CardSavedComponent } from './components/payment/card-saved/card-saved.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { AuthMenuComponent } from './components/master/navi/auth-menu/auth-menu.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { FooterComponent } from './components/master/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MasterComponent } from './components/master/master.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    CarComponent,
    RentalComponent,
    NaviComponent,
    CarDetailComponent,
    FilterBrandPipePipe,
    FilterColorPipePipe,
    CarFilterComponent,
    PaymentComponent,
    CarAddComponent,
    CarUpdateComponent,
    BrandListComponent,
    ColorListComponent,
    LoginComponent,
    AuthMenuComponent,
    RegisterComponent,
    ProfileComponent,
    RentalManagementComponent,
    CardSavedComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
  ],
  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
