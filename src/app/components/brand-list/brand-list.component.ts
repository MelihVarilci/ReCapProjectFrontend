import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css'],
})
export class BrandListComponent implements OnInit {
  brands: Brand[] = [];
  dataLoaded = false;

  brandAddForm: FormGroup;
  brandUpdateForm: FormGroup;
  brandDeleteForm: FormGroup;
  selectedBrand: Brand;

  constructor(
    private brandService: BrandService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.addCreateForm();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = response.success;
    });
  }

  addCreateForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  setSelectedBrandToUpdate(brand: Brand) {
    this.selectedBrand = brand;
    this.updateCreateForm();
  }

  updateCreateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.selectedBrand.brandId, Validators.required],
      brandName: ['', Validators.required],
    });
  }

  setSelectedBrandToDelete(brand: Brand) {
    this.selectedBrand = brand;
    this.deleteCreateForm();
  }

  deleteCreateForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: [this.selectedBrand.brandId, [Validators.required]],
      brandName: [this.selectedBrand.brandName, [Validators.required]],
    });
  }

  addBrand() {
    if (this.brandAddForm.valid) {
      let addBrandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(addBrandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Marka ismi boş olamaz',
        'Ekleme Başarısız');
    }
  }

  updateBrand() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Marka ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }

  deleteBrand() {
    if (this.brandDeleteForm.valid) {
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      this.brandService.deleteBrand(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning(
        'Marka ismi boş olamaz',
        'Güncelleme Başarısız'
      );
    }
  }
}
