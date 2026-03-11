import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { InputComponent } from "../../../../shared/components/ui/input/input.component";
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    InputComponent
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export default class LoginPage {

  fb = inject(FormBuilder);
  hidePassword = signal(true);
  router = inject(Router);
  userSrv = inject(UserService);
  toast = inject(ToastrService);
  storageSrv = inject(StorageService);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = this.form.getRawValue();

    this.userSrv.login(data).subscribe(resp => {
      if (resp.status) {
        this.storageSrv.setToken(resp.data.token);
        this.storageSrv.setSession(resp.data);
        this.toast.success(resp.message);
        this.router.navigate(['/app']);
      } else {
        this.toast.error(resp.message, 'Error', {
          positionClass: 'toast-top-center'
        });
      }
    });
  }

  goToForgot = () => {
    this.router.navigate(['/auth/forgot-password']);
  };
}
