import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { InputComponent } from "../../../../shared/components/ui/input/input.component";

@Component({
  selector: 'register-page',
  imports: [RouterLink, ReactiveFormsModule, InputComponent],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss',
})
export default class RegisterPage { 
  fb = inject(FormBuilder);
  hidePassword = signal(true);

  form = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  register() {
    if (this.form.invalid) return;

    // Aquí luego llamaremos al authService
  }
}
