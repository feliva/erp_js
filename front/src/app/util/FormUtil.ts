import {FormGroup} from "@angular/forms";

export class FormUtil{

  static showAllErrorValidation(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }

  static resetValidations(formGroup:FormGroup){
    formGroup.markAsUntouched()
    formGroup.markAsPristine()
    formGroup.reset('');
    formGroup.updateValueAndValidity()
  }
}
