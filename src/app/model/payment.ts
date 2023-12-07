import { PaymentStatus } from "./enume/payment-status";

export interface Payment {
    paymentStatus:PaymentStatus;
    amount:number;
}
