import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rental } from 'src/app/models/entities/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-management',
  templateUrl: './rental-management.component.html',
  styleUrls: ['./rental-management.component.css'],
})
export class RentalManagementComponent implements OnInit {
  rentDetails: Rental[] = [];  
  dataLoaded = false;

  displayedColumns: string[] = ['rentalId', 'araba', 'musteri', 'kiralamaTarih', 'teslimTarih'];

  listData: MatTableDataSource<any>;
  searchKey: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals() {
    this.rentalService.getRental().subscribe((response) => {
      this.rentDetails = response.data;
      this.dataLoaded = response.success;

      this.listData = new MatTableDataSource(this.rentDetails);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
