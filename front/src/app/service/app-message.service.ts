import {inject, Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

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

}
