import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];
  brandIdFilter: number;
  colorIdFilter: number;

  constructor(
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.brandIdFilter = Number(this.activatedRoute.snapshot.paramMap.get('brandId'));
    this.colorIdFilter = Number(this.activatedRoute.snapshot.paramMap.get('colorId'));
    this.getBrands();
    this.getColors();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(respone => {
      this.brands = respone.data;
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  clearFilter() {
    this.brandIdFilter = 0;
    this.colorIdFilter = 0;
  }

  setFilteredRoute(brandIdFilter: number, colorIdFilter: number) {
    if (brandIdFilter && colorIdFilter) {
      this.router.navigate(['/cars/brand/' + brandIdFilter + '/color/' + colorIdFilter]);
    } else if (brandIdFilter) {
      this.router.navigate(['/cars/brand/' + brandIdFilter]);
    } else if (colorIdFilter) {
      this.router.navigate(['/cars/color/' + colorIdFilter]);
    } else {
      this.router.navigate(['/cars']);
    }
  }

  getSelectedBrand(brandId: number) {
    if (this.brandIdFilter == brandId) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedColor(colorId: number) {
    if (this.colorIdFilter == colorId) {
      return true;
    } else {
      return false;
    }
  }

}
