import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit, Self
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors
} from "@angular/forms";
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-react-message-validation',
    template: `
    <ng-content></ng-content>
    <div *ngIf="this.menssagens.length > 0" style="color: red;width: initial;" class="flex flex-column pt-2">
      <small class="pb-1" *ngFor="let err of menssagens" >{{err}}</small>
    </div>
  `,
    styles: [`

  `],
    standalone: true,
    imports: [NgIf, NgFor],
    viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective ,}]
})
export class ReactMessageValidationComponent implements AfterContentChecked,OnInit {

  @Input() formGroup!: FormGroup;

  /**
   * cuidado com o reset no formGroup
   */
  @Input() fmControlName!: string;
  @Input() label: string|undefined;

  children:any[] =[];
  menssagens:string[] = [];
  formControl?:FormControl;

  constructor(public elRef: ElementRef, public parentForm: FormGroupDirective) {
  }

  ngOnInit() {
    if(!this.formGroup)
      this.formGroup = this.parentForm.form;//form nao esta disponivel no constritor
    if(this.fmControlName)
      return;

    this.children = Array.prototype.slice.call(this.elRef.nativeElement.children);
    if(this.children.length >0) {
      this.label = this.elRef.nativeElement.children[0].firstChild.textContent
      this.fmControlName = ((this.elRef.nativeElement.children[1] as HTMLElement).getAttribute('formControlName') as string);
    }else{
      console.debug('ReactMessageValidationComponent sem children')
    }
    this.formControl = this.getFormControl(this.formGroup, this.fmControlName);
  }

  ngAfterContentChecked(){
    // let control:FormControl|undefined = this.getFormControl(this.formGroup, this.fmControlName)
      if(this.formControl!= undefined && this.formControl.touched && !this.formControl.valid){
        this.menssagens = this.message();
      }else{
        this.menssagens = [];
      }
  }

  private getFormControl(formGroup:FormGroup, formControName:string):FormControl|undefined{
    let control:FormControl|undefined;

    for (const [key,value] of Object.entries(formGroup.controls) ) {
      if(key == formControName && value instanceof FormControl){
        control = value;
        return value;
      }

      if(value instanceof FormGroup){
        control = this.getFormControl(value, this.fmControlName);
      }
    }

    return control;
  }

  message():string[]{
    let msg: Array<string> = [];
    if(this.label == undefined){
      this.label = '';
    }
    // if(this.formControl) {
      let fCom: ValidationErrors | null | undefined = this.formControl?.errors;
      for (const errorName in fCom) {
        msg.push(this.getErrorMsg(this.label, errorName, fCom[errorName]));
      }
    // }
    return msg;
  }

  private getErrorMsg(label: string, errorName: string,errorValue:any):string {

    const config :{[key:string]:string} = {
      'required': `${label} é obrigatório.`,
      'min': `${label} o valor mínimo é ${errorValue.min}.`,
      'max': `${label} o valor máximo ${errorValue.max}.`,
      'cepInvalido': 'CEP inválido.',
      'emailInvalido': 'Email já cadastrado!',
      'email': 'E-mail inválido!',
      'equalsTo': 'Campos não são iguais',
      'pattern': 'Campo inválido'
    };
    return config[errorName]
  }

}
