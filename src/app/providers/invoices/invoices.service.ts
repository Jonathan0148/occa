import { Injectable } from '@angular/core';
import invoices from './mock-invoices';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {
  invoiceCounter: number = 0;
  invoices: Array<any> = invoices;

  findAll() {
    return this.invoices;
  }

  findById(id) {
    return Promise.resolve(this.invoices[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.invoices.length; i++) {
      if (this.invoices[i].id === parseInt(id)) {
        return this.invoices[i];
      }
    }
    return null;
  }

  getInvoices() {
    return Promise.resolve(this.invoices);
  }
}
