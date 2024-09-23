import {inject, Injectable} from '@angular/core';
import {MessageService} from "primeng/api";
import {FormGroup, ValidationErrors} from "@angular/forms";
import {LFormControl} from "../model/Movimentacao";

@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  message:MessageService = inject(MessageService)

  constructor() { }

  addSuccess(title:string,msg:string){
    this.message.add({ severity: 'success', summary: title, detail: msg })
  }

  addError(title:string,msg:string){
    this.message.add({ severity: 'error', summary: title, detail: msg })
  }

  addWarn(title:string,msg:string){
    this.message.add({ severity: 'warn', summary: title, detail: msg })
  }

  addInfo(title:string,msg:string){
    this.message.add({ severity: 'info', summary: title, detail: msg })
  }

  addContrast(title:string,msg:string) {
    this.message.add({ severity: 'contrast', summary: title, detail: msg });
  }

  addSecondary(title:string,msg:string) {
    this.message.add({ severity: 'secondary', summary: title, detail: msg });
  }

  showMEssages(fGroup:FormGroup){

    console.log('Entrando for')
    for(const field in fGroup.controls){

      if(!fGroup.controls[field].valid){
        // let ll:LFormControl =  fGroup.controls[field];
        console.log(fGroup.controls[field])
        let fCom :ValidationErrors | null = fGroup.controls[field].errors;
        for (const errorName in fCom ) {
          this.addError('',this.getErrorMsg('',errorName,fCom[errorName]));
        }
      }
    }
  }

  // hasError():boolean{
  //   return this.fGroup.controls[this.field].touched && !this.fGroup.controls[this.field].valid
  // }
  // message():string[]{
  //   if(this.label == undefined){
  //     this.label = '';
  //   }
  //   let fCom :ValidationErrors | null = this.fGroup.controls[this.field].errors;
  //   let msg:Array<string> = [];
  //   for (const errorName in fCom ) {
  //     msg.push(this.getErrorMsg(this.label,errorName,fCom[errorName]));
  //   }
  //   return msg;
  // }

  private getErrorMsg(label: string, errorName: string,errorValue:any):string {
    console.log(errorName);
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
