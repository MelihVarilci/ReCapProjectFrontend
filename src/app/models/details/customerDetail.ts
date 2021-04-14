import { Customer } from "../entities/customer";

export interface CustomerDetail extends Customer {
    firstName: string;
    lastName: string;
    email: string;
    status: boolean;
    password: string;
}