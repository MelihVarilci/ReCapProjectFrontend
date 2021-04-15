import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/details/carDetail';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit, OnDestroy {
  carDetail: CarDetail[] = [];
  apiUrl: string = "https://localhost:44352";
  dataLoaded = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<CarDetail>;

  constructor(private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"] && params["colorId"]) {
        this.getCarDetails(params["brandId"], params["colorId"]);
      }
      else if (params["brandId"]) {
        this.getCarsByBrandId(params["brandId"]);
      }
      else if (params["colorId"]) {
        this.getCarsByColorId(params["colorId"])
      }
      else {
        this.getCars();
      }
    })
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.carDetail = response.data;
      this.dataLoaded = true;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.carDetail);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }

  getCarsByBrandId(brandId: number) {
    this.carService.getCarsByBrandId(brandId).subscribe(response => {
      this.carDetail = response.data;
      this.dataLoaded = true;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.carDetail);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarsByColorId(colorId).subscribe(response => {
      this.carDetail = response.data;
      this.dataLoaded = true;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.carDetail);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }

  getCarDetails(brandId: number, colorId: number) {
    this.carService.getCarDetails(brandId, colorId).subscribe(response => {
      this.carDetail = response.data;
      this.dataLoaded = true;

      this.changeDetectorRef.detectChanges();
      this.dataSource = new MatTableDataSource(this.carDetail);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }
}
