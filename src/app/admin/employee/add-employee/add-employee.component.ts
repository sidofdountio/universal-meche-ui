import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
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
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(9)]],
    address: ['', [Validators.required]],
    sexe: ['', [Validators.required]],
    salary: ["", [Validators.required,Validators.pattern(/^[1-9]\d*$/)]],
    birthDay: ["", [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    private fb: FormBuilder) {

  }
  ngOnInit(): void {
    
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
