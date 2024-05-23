import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import {
  InvoicesService,
  TranslateProvider
} from '../../providers';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})

export class InvoicesPage {
  lastInvoices: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoicesService: InvoicesService
  ) {
    this.getInvoices();
  
  }

  getInvoices() {
    this.invoicesService.getInvoices()
      .then(data => {
        this.lastInvoices = data;
      });
  }

  async goCheckout(invoice) {
    let navigationExtras: NavigationExtras = {
      state: {
        invoice: invoice
      }
    };
    
    this.router.navigate(['checkout'], navigationExtras);
  };


}
