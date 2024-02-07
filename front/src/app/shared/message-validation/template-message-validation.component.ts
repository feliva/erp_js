import {Component, ElementRef, Input} from '@angular/core';
import {FormGroup, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-template-message-validation',
  template: `
    <ng-content></ng-content>
    <div *ngIf="hasError()" style="color: red;width: initial;" class="flex flex-column pt-2">
      <small class="pb-1" *ngFor="let err of message()" >{{err}}</small>
    </div>
  `,
  styles: [`
    
  `]
})
export class TemplateMessageValidationComponent {

  @Input() fGroup! : FormGroup;
  @Input() field!: string;
  @Input() label!: string;

  constructor(private elRef: ElementRef) {
  }
  hasError():boolean{
    return this.fGroup.controls[this.field].touched && !this.fGroup.controls[this.field].valid
  }
  message():string[]{
    if(this.label == null){
      this.label =  this.field;
    }
    let fCom :ValidationErrors | null = this.fGroup.controls[this.field].errors;
    let msg:Array<string> = [];
    for (const errorName in fCom ) {
      msg.push(this.getErrorMsg(this.label,errorName,fCom[errorName]));
    }
    return msg;
  }

  private getErrorMsg(label: string, errorName: string,errorValue:any):string {
    console.log(errorName);
    const config :{[key:string]:string} = {
      'required': `${label} é obrigatório.`,
      'minlength': `${label} precisa ter no mínimo ${errorValue.requiredLength} caracteres.`,
      'maxlength': `${label} precisa ter no máximo ${errorValue.requiredLength} caracteres.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'email': 'E-mail inválido!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };

    return config[errorName]
  }

}
