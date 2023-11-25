import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/model/product';
import { Custormer } from 'src/app/model/custorme';
import { SnabarService } from 'src/app/service/snabar.service';
import { SaleRequest } from 'src/app/model/sale-request';

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css']
})
export class AddSaleComponent implements OnInit {

  // Display sale by filter
  custormeType: string = "";
  custormeTypeSelected: string = "";
  customerTypes: string[] = ['Client', 'Grosiste'];
  customers: Custormer[] = [{
    id: 2,
    name: 'test'
  }];

  saleRequest: SaleRequest = {
    quantity: undefined,
    price: undefined,
    custormeType: undefined,
    product: {
      id: 1,
      name: '',
      price: 0,
      salePrice: 0,
      code: '',
      color: '',
      description: '',
      productCategory: {
        name: '',
        categoryType: {
          name: ''
        }
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
      id: ['']
    }),
    formProduct: this.fb.group({
      id: [this.data.id]
    })
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<AddSaleComponent>,
    private fb: FormBuilder, private snacbarService: SnabarService) {


  }


  ngOnInit(): void {


  }

  filterCustomerType(typeSelected: string) {
    this.custormeTypeSelected = typeSelected;
    console.log("Fitre %s", this.custormeTypeSelected);
    this.snacbarService.openSnackBar(`Vous Avez Choisir  ${this.custormeTypeSelected}`, "Fermer");
    if (typeSelected === "Grosiste") {
      this.formSale = this.fb.group({
        price: [this.data.price],
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
        price: [this.data.price],
        quantity: [, [Validators.required]],
        custormeType: ['Client'],
        formCustomer: this.fb.group({
          id: ['']
        }),
        formProduct: this.fb.group({
          id: [this.data.id]
        })
      });
    }

  }

  onSaveSaleProduct() {
    this.saleRequest = {
      quantity: this.formSale.value.quantity,
      price: this.formSale.value.price,
      custormeType: this.formSale.value.custormeType,
      product: {
        id: this.data.id,
        name: '',
        price: 0,
        salePrice: 0,
        code: '',
        color: '',
        description: '',
        productCategory: {
          name: '',
          categoryType: {
            name: ''
          }
        }
      },
      customer: {
        id: this.formSale.value.formCustomer?.id,
        name: ''
      }
    }
    this.dialogRef.close(this.saleRequest);
  }

  onClose() {
    this.dialogRef.close();
  }

}



