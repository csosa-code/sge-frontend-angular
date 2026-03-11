import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { InputComponent } from "../../../../shared/components/ui/input/input.component";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule, InputComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export default class RegisterPage { 
  fb = inject(FormBuilder);
  userSrv = inject(UserService);
  router = inject(Router);
  hidePassword = signal(true);
  toast = inject(ToastrService);

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  register() {
    if (this.form.invalid) return;

    const data = this.form.getRawValue();

    this.userSrv.register(data).subscribe( resp => {
      if (resp.status) {
        this.toast.success(resp.message);
        this.router.navigate(['/auth/login']);
      } else {
        this.toast.error(resp.message);
      }
    });
  }
}
