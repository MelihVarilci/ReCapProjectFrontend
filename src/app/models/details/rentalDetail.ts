import { Rental } from "../entities/rental";

export interface RentalDetail extends Rental {
    brandName: string;
    colorName: string;
    firstName: string;
    lastName: string;
    companyName: string;
    carModelYear: number;
    carDailyPrice: number;
    carDescription: string;
}