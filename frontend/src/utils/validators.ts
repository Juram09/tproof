import { AbstractControl } from '@angular/forms';
export class MyValidator {
  static isAccountValid(control: AbstractControl) {
    const value = control.value;
    if (value < 75028602000000001 || value > 75028602009999999) {
      return { account_invalid: true };
    }
    return null;
  }
  static isMoneyValid(control: AbstractControl) {
    const value = control.value;
    if (value < 1) {
      return { money_invalid: true };
    }
    return null;
  }
  static isNumber(control: AbstractControl) {
    const value = control.value;
    try {
      Number(value);
      return null;
    } catch {
      return { account_invalid: true };
    }
  }
}
