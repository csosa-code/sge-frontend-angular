
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AreaService } from '../../../areas/services/area.service';
import { Area } from '../../../areas/interfaces/area.interface';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from "../../../../shared/components/ui/input/input.component";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'employee-upsert-dialog',
  imports: [ReactiveFormsModule, InputComponent,MatDialogModule],
  templateUrl: './employee-upsert.dialog.html',
  styleUrl: './employee-upsert.dialog.scss',
})
export default class EmployeeUpsertDialog implements OnInit { 

  fb = inject(FormBuilder);
  areaService = inject(AreaService);
  employeeSrv = inject(EmployeeService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  dialogRef = inject(MatDialogRef<EmployeeUpsertDialog>);
  dialogData = inject(MAT_DIALOG_DATA) as { employeeId?: number };
  toastr = inject(ToastrService);
  isEdit = computed(() => !!this.dialogData.employeeId);
  areas = signal<Area[]>([]);
  reload = signal<boolean>(false);

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    areaId: [null as number | null, [Validators.required]],
    salary: [null as number | null, [Validators.required, Validators.min(0)]],
    startDate: [ new Date().toISOString().split('T')[0], [Validators.required]],
    statusId: [1, [Validators.required]],
  });

  ngOnInit() {
    this.getAreas();
    if (this.isEdit()) {
      this.getEmployee();
    }
  }

  getAreas() {
    this.areaService.getAll().subscribe((resp) => {
      if (resp.status) {
        this.areas.set(resp.data.filter((area: Area) => area.statusId));
      }
    });
  }

  getEmployee() {
    this.employeeSrv.getById(this.dialogData.employeeId!).subscribe((resp) => {
      if (resp.status) {
        const employee = resp.data;

        this.form.patchValue({
          ...employee,
          startDate: new Date(employee.startDate).toISOString().split('T')[0]
        });
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    if (this.isEdit()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }


  add(data: any) {
    this.employeeSrv.set(data).subscribe((resp) => {
      if (resp.status) {
        this.reload.set(true);
        this.toastr.success(resp.message);
        this.close();
      } else {
        this.toastr.error(resp.message);
      }
    });
  }

  update(data: any) {
    this.employeeSrv.update(data, this.dialogData.employeeId!).subscribe((resp) => {
      if (resp.status) {
        this.reload.set(true);
        this.toastr.success(resp.message);
        this.close();
      } else {
        this.toastr.error(resp.message);
      }
    });
  }

  close() {
    this.dialogRef.close(this.reload());
  }
}
