import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';



export function createPasswordConfirmValidator( matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): 
    ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent &&
        !!control.parent.value &&
        control.value === 
        (control.parent?.controls as any)[matchTo].value
        ? null
        : { matching: true };
    };
}

export function createPasswordStrenghtValidator() : ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if(!value) return null;

        const hasEightChars = value.length >= 8;
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumber = /[0-9]+/.test(value);
        const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
        const passwordValid = hasEightChars && hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacters;

        return !passwordValid ? {passwordStrenght: true} : null;
    }
}

export function endDateBeforeStartDateValidator(): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const startDate = formGroup.get('dateStart')?.value;
    const endDate = formGroup.get('dateEnd')?.value;

    if (startDate && endDate && startDate > endDate) {
      console.log("END DATE BEFORE START DATE");
      formGroup.get('dateEnd')?.setErrors({ endDateBeforeStartDate: true });
    } else {
      formGroup.get('dateEnd')?.setErrors(null);
    }

    return null;
  };
}