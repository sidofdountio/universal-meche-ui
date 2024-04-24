import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { switchMap,tap } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SnabarService } from 'src/app/service/snabar.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/model/invoice';
import { DataState } from 'src/app/model/enume/data-state';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent {
  invoices$!: Observable<Invoice[]>;
  readonly DataState = DataState;
  state: DataState = DataState.LOADING_STATE;
  invoiceNumer: any = 0;
  customerEmail: any;
  customerAddress: any;
  invoiceDate!: string | Date;
  invoiceSubTotal: any;
  invoiceTax: any;
  invoiceTotal!: string | number;
  customerPhone: any;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private snackBarService: SnabarService,
    private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoices$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.invoiceService.getInvoiceByInvoiceNumber(params.get('invoiceNumber')!).pipe(
          tap(
            (data) => {
              for (let iterator of data) {
                this.invoiceNumer = iterator.invoiceNumber;
                this.customerAddress = iterator.sale.customer?.address;
                this.customerEmail = iterator.sale.customer?.name;
                this.customerPhone = iterator.sale.customer?.phone;
                this.invoiceDate = iterator.createAt;
                this.invoiceSubTotal = iterator?.subTotal;
                this.invoiceTax = iterator?.tax;
                this.invoiceTotal = iterator.total
              }
              this.state = DataState.LOADING_STATE;
            },
            () => {
              this.state = DataState.ERROR_STATE;
            },
            () => {

              this.state = DataState.LOADED_STATE;
            }
          ))
    ));
  }

  exportToPDF(invoiceNumber: any) {
    const button = document.getElementById('invoice-contents');
    if (button) {

      html2canvas(button).then((canvas) => {
        const data = canvas.toDataURL();
        const documentDefinition = {
          content: [
            {
              image: data,
              width: 500
            }
          ]
        };
        pdfMake.createPdf(documentDefinition).download('invoice-' + invoiceNumber + '.pdf');
      });
    }
  }

}
