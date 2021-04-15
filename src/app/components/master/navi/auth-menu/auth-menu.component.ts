import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/details/customerDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.css'],
})
export class AuthMenuComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.success('Çıkış yapıldı', 'Başarılı');

    return this.router.navigate(['/auth/login']);
  }

  getCurrentCustomer(): CustomerDetail {
    return this.localStorageService.getCurrentCustomer();
  }
}
