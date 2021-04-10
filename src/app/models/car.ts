export interface Car {
  carId?: number;
  brandName: string;
  colorName: string;
  carModelYear: number;
  carDailyPrice: number;
  carDescription: string;
  status?: boolean;
}

export interface CarDetail extends Car {
  brandId: number;
  colorId: number;
}
