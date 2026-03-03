import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from "@angular/router";
import { InputComponent } from "../../../../shared/components/ui/input/input.component";

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
  showError = signal(false);
  fb = inject(FormBuilder);
  hidePassword = signal(true);
  router = inject(Router);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);
    this.router.navigate(['/app']);
  }

  goToForgot = () => {
    this.router.navigate(['/auth/forgot-password']);
  };
}
