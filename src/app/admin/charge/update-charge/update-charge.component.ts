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
    totalSalary: 0,
    impot: 0,
    loyer: 0,
    ration: 0,
    transport: 0,
    electricity: 0,
   
  };
  formCharge = this.fb.group({
    totalSalaire: [this.data.totalSalary, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    impot: [this.data.impot, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    loyer: [this.data.loyer, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    electricity: [this.data.electricity, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    ration: [this.data.ration, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
    transport: [this.data.transport, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Charge,
    public dialogRef: MatDialogRef<UpdateChargeComponent>,
    private fb: FormBuilder) {
  }

  onSaveCharge() {
    let updateharge : Charge = {
      id: this.data.id,
      totalSalary: this.formCharge.value.totalSalaire,
      impot: this.formCharge.value.impot,
      loyer: this.formCharge.value.loyer,
      ration: this.formCharge.value.ration,
      transport: this.formCharge.value.transport,
      electricity: this.formCharge.value.electricity,
     
    }
  
    this.dialogRef.close(updateharge);
  }
  onClose() {
    this.dialogRef.close();
  }

}


