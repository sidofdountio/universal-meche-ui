import { Component, Inject } from '@angular/core';
import { Validators, NonNullableFormBuilder, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {

  employee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    birthDay: '',
    sexe: '',
    salary: ""
  }

  formEmployee = this.fb.group({
    firstName: [this.data.firstName, [Validators.required]],
    lastName: [this.data.lastName, [Validators.required]],
    phone: [this.data.phone, [Validators.required,Validators.minLength(9)]],
    address: [this.data.address, [Validators.required]],
    sexe: [this.data.sexe, [Validators.required]],
    salary: [this.data.salary, [Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
    birthDay: [this.data.birthDay, [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    private fb: FormBuilder) {

  }

  onClose() {
    this.dialogRef.close();
  }
  onSaveEmployee() {
    this.employee = {
      id: null,
      firstName: this.formEmployee.value.firstName,
      lastName: this.formEmployee.value.lastName,
      phone: this.formEmployee.value.phone,
      address: this.formEmployee.value.address,
      birthDay: this.formEmployee.value.birthDay,
      sexe: this.formEmployee.value.sexe,
      salary: this.formEmployee.value.salary
    }
    this.dialogRef.close(this.employee);
  }
}
