import { Component, Inject, InjectionToken } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Charge } from 'src/app/model/charge';

@Component({
  selector: 'app-update-charge',
  templateUrl: './update-charge.component.html',
  styleUrls: ['./update-charge.component.css']
})
export class UpdateChargeComponent {

  charge: Charge = {
    id: 0,
    totalSalaire: 0,
    impot: 0,
    loyer: 0,
    ration: 0,
    transport: 0,
    electriciter: 0,
    autreCharge: {
      id: 0,
      raison: '',
      amount: 0
    }
  };
  formCharge = this.fb.group({
    totalSalaire: [this.data.totalSalaire, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    impot: [this.data.impot, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    loyer: [this.data.loyer, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    electricity: [this.data.electriciter, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    ration: [this.data.ration, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    transport: [this.data.transport, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    anotherCharge: this.fb.group({
      id: [1],
      raison: [this.data.autreCharge.raison],
      amount: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    })
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Charge,
    public dialogRef: MatDialogRef<UpdateChargeComponent>,
    private fb: FormBuilder) {
  }

  onSaveCharge() {
    this.charge = {
      id: this.data.id,
      totalSalaire: this.formCharge.value.totalSalaire,
      impot: this.formCharge.value.impot,
      loyer: this.formCharge.value.loyer,
      ration: this.formCharge.value.ration,
      transport: this.formCharge.value.transport,
      electriciter: this.formCharge.value.electricity,
      autreCharge: {
        id: 1,
        raison: this.formCharge.value.anotherCharge?.raison as string,
        amount: this.formCharge.value.anotherCharge?.amount
      }
    }
    this.dialogRef.close(this.charge);
  }
  onClose() {
    this.dialogRef.close();
  }

}


