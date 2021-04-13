import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;
  currentBrand: Brand = { brandId: -1, brandName: "" };
  filterBrandText = "";

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe(response => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }

  removeCurrentBrand() {
    this.filterBrandText = "";
    this.currentBrand = { brandId: -1, brandName: "" };
  }

  getCurrentBrandClass(brand: Brand) {
    if (this.currentBrand == brand) {
      return "list-group-item active"
    }
    else {
      return "list-group-item"
    }
  }

  getAllBrandClass() {
    let defaultBrand: Brand = { brandId: -1, brandName: "" };
    if (this.currentBrand.brandId == defaultBrand.brandId) {
      return "list-group-item active cursorPointer"
    } else {
      return "list-group-item cursorPointer"
    }

  }

}
