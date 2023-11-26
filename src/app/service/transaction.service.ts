import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  
   generateTransactionId(): string {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomString = Math.random().toString(36).substr(2, 5); // Generate a random base36 string
    const transactionId = timestamp + randomString;
  
    return transactionId;
  }
}
