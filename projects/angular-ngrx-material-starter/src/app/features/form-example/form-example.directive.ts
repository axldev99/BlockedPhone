import { Directive } from "@angular/core";
import { AbstractControl, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrenghtValidator } from "./form-example.validator";


@Directive({
    selector: '[password-strength]',
})

export class PasswordStrengthDirective implements Validator {
    validate(control: AbstractControl) : ValidationErrors | null {
        return createPasswordStrenghtValidator()(control);
    }
}