import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { Custormer } from 'src/app/model/custorme';
import { SnabarService } from 'src/app/service/snabar.service';
import { SaleRequest } from 'src/app/model/sale-request';
import { CustormeService } from 'src/app/service/custorme.service';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  customerName: string = "";
  // Display sale by filter
  custormeType: string = "";
  custormeTypeSelected: string = "";
  customerTypes: string[] = ['Client', 'Grosiste'];
  customers: Custormer[] = [];

  saleRequest: SaleRequest = {
    quantity: undefined,
    price: undefined,
    custormeType: undefined,
    product: {
      id: 1,
      length: 0,
      name: '',
      price: 0,
      salePrice: 0,
      code: '',
      color: '',
      description: '',
      productCategory: {
        id: undefined,
        name: ''
      }
    },
    customer: {
      id: 1,
      name: ''
    }
  }

  formSale = this.fb.group({
    price: [this.data.salePrice],
    quantity: [, [Validators.required]],
    custormeType: ['', [Validators.required]],
    formCustomer: this.fb.group({
      id: ['', [Validators.required]]
    }),
    formProduct: this.fb.group({
      id: [this.data.id]
    })
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddSaleComponent>,
    private fb: FormBuilder, private snacbarService: SnabarService,
    private customerService: CustormeService) {
  }

  ngOnInit(): void {
    this.customerService.getCustormes().subscribe(
      (response) => {
        this.customers = response;
        for (let item of response) {
          if (item.id === this.formSale.value.formCustomer?.id)
            this.customerName = item.name as string;
        }
      }
    )
  }

  filterCustomerType(typeSelected: string) {
    this.custormeTypeSelected = typeSelected;
    console.log("Fitre %s", this.custormeTypeSelected);
    this.snacbarService.openSnackBar(`Vous Avez Choisir  ${this.custormeTypeSelected}`, "Fermer");
    if (typeSelected === "Grosiste") {
      this.formSale = this.fb.group({
        price: [this.data.salePrice, Validators.required],
        quantity: [, [Validators.required]],
        custormeType: ['Grosiste'],
        formCustomer: this.fb.group({
          id: ['', [Validators.required]]
        }),
        formProduct: this.fb.group({
          id: [this.data.id]
        })
      });
    }
    else {
      this.formSale = this.fb.group({
        price: [this.data.salePrice,Validators.required],
        quantity: [, [Validators.required]],
        custormeType: ['Client'],
        formCustomer: this.fb.group({
          id: ['', [Validators.required]]
        }),
        formProduct: this.fb.group({
          id: [this.data.id]
        })
      });
    }

  }

  onSaveSaleProduct() {
    let saleRequest: SaleRequest = {
      quantity: this.formSale.value.quantity,
      price: this.formSale.value.price,
      custormeType: this.formSale.value.custormeType,
      product: {
        id: this.data.id,
        name: this.data.name,
        length: 0,
        price: this.data.price,
        salePrice: this.data.salePrice,
        code: '',
        color: '',
        description: '',
        productCategory: {
          id: undefined,
          name: ''
        }
      },
      customer: {
        id: this.formSale.value.formCustomer?.id,
        name: ''
      }
    }
    console.log(saleRequest);
    this.dialogRef.close(saleRequest);
  }

  onClose() {
    this.dialogRef.close();
  }

}



