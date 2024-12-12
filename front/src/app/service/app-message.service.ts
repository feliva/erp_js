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

  addSuccess(msg:string,title:string ='Sucesso'){
    this.message.add({ severity: 'success', summary: title, detail: msg })
  }

  addError(msg:string,title:string = 'Erro'){
    this.message.add({ severity: 'error', summary: title, detail: msg })
  }

  addWarn(msg:string,title:string = 'Atenção'){
    this.message.add({ severity: 'warn', summary: title, detail: msg })
  }

  addInfo(msg:string,title:string = 'Informação'){
    this.message.add({ severity: 'info', summary: title, detail: msg })
  }

  addContrast(msg:string,title:string = 'Informação') {
    this.message.add({ severity: 'contrast', summary: title, detail: msg });
  }

  addSecondary(msg:string,title:string = 'Informação') {
    this.message.add({ severity: 'secondary', summary: title, detail: msg });
  }
}
