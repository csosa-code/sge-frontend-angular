import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor { 

  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  icon = input<string | undefined>();
  linkText = input<string | undefined>();
  linkAction = input<(() => void) | undefined>();

  hidePassword = signal(true);

  value = '';
  disabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event) {
    const inputEl = event.target as HTMLInputElement;
    this.value = inputEl.value;
    this.onChange(this.value);
  }

  togglePassword() {
    this.hidePassword.update(v => !v);
  }

  get inputType() {
    if (this.type() === 'password') {
      return this.hidePassword() ? 'password' : 'text';
    }
    return this.type();
  }
}
