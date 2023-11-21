import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  generateInvoiceId(prefix: string): string {
    const uniqueNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    const invoiceId = `${prefix}-${uniqueNumber.toString().padStart(6, '0')}`; // Combine prefix and unique number

    return invoiceId;
  }
}
