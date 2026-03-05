import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import EmployeeUpsertDialog from '../../../employees/components/employee-upsert/employee-upsert.dialog';
import { EmployeeService } from '../../../employees/services/employee.service';
import { Area } from '../../interfaces/area.interface';
import { AreaService } from '../../services/area.service';
import { InputComponent } from "../../../../shared/components/ui/input/input.component";


@Component({
    selector: 'area-upsert-dialog',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './area-upsert.dialog.html',
  styleUrl: './area-upsert.dialog.scss',
})
export default class AreaUpsertDialog { 

  fb = inject(FormBuilder);
  areaService = inject(AreaService);
  dialogRef = inject(MatDialogRef<AreaUpsertDialog>);
  dialogData = inject(MAT_DIALOG_DATA) as { areaId?: number };
  isEdit = computed(() => !!this.dialogData.areaId);
  reload = signal<boolean>(false);
  statuses = signal([{statusId: 0, name: 'Inactivo'}, {statusId: 1, name: 'Activo'}]);

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    statusId: [1, [Validators.required]],
  });

  ngOnInit() {
    if (this.isEdit()) {
      this.getArea();
    }
  }


  getArea() {
    this.areaService.getById(this.dialogData.areaId!).subscribe((resp) => {
      if (resp.status) {
        this.form.patchValue(resp.data);
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
    this.areaService.set(data).subscribe((resp) => {
      if (resp.status) {
        this.reload.set(true);
        this.close();
      } else {
        console.error(resp.message);
      }
    });
  }

  update(data: any) {
    this.areaService.update(data, this.dialogData.areaId!).subscribe((resp) => {
      if (resp.status) {
        this.reload.set(true);
        this.close();
      } else {
        console.error(resp.message);
      }
    });
  }

  close() {
    this.dialogRef.close(this.reload());
  }
}
