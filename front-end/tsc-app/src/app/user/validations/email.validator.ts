import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value as string);
  if (!value) { return null; }
  const isValidEmail = /^[a-zA-Z0-9\.-_]{3,}@\w+\.(com|bg)$/.test(value);
  return isValidEmail ? null : { emailValidator: true };
}