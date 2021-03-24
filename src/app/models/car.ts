/*
{
    "carId": 1,
    "brandName": "Ford",
    "colorName": "Kırmızı",
    "carModelYear": 2018,
    "carDailyPrice": 120,
    "carDescription": "Öğretmenden"
}
data, message, success
*/
export interface Car{
    carId:number,
    brandName:string,
    colorName:string,
    carModelYear:number,
    carDailyPrice:number,
    carDescription:string,
    status:boolean
}