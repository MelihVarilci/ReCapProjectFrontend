/*
{
    "rentalId": 0,
    "carId": 4,
    "brandName": "Opel",
    "colorName": "Siyah",
    "firstName": "Melih",
    "lastName": "Varılcı",
    "companyName": "MV",
    "carModelYear": 2021,
    "carDailyPrice": 240,
    "carDescription": "Mühendisten",
    "rentDate": "2021-01-01T00:00:00",
    "returnDate": "2021-02-17T00:00:00"
},
*/
export interface Rental{
    rentalId?:number,
    carId:number,
    brandName:string,
    colorName:string,
    firstName?:string,
    lastName?:string,
    companyName?:string,
    carModelYear:number,
    carDailyPrice:number,
    carDescription:string,
    rentDate:Date,
    returnDate:Date,
    customerId?:number,
}