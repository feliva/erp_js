import {Injectable} from '@angular/core';
import {Message} from './Message';

@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  msgs:Map<number,Message> = new Map();
  index:number = 0;

  constructor() { }

  addSuccess(title:String,msg:String){

    this.msgs.set(++this.index,{icon:"pi pi-check-circle",msg:msg,type:"success",title:title});
    setTimeout((key:number) => {
      // this.messges.
      console.log(key);
      this.msgs.delete(key);

    }, 50000,this.index);
  }

  addError(title:String,msg:String){

    this.msgs.set(++this.index,{icon:"pi pi-times-circle",msg:msg,type:"error",title:title});
    setTimeout((key:number) => {
      // this.messges.
      console.log(key);
      this.msgs.delete(key);

    }, 50000,this.index);
  }

  addWarn(title:String,msg:String){

    this.msgs.set(++this.index,{icon:"pi pi-exclamation-triangle",msg:msg,type:"warn",title:title});
    setTimeout((key:number) => {
      // this.messges.
      console.log(key);
      this.msgs.delete(key);

    }, 50000,this.index);
  }

  addInfo(title:String,msg:String){

    this.msgs.set(++this.index,{icon:"pi pi-exclamation-circle",msg:msg,type:"info",title:title});
    setTimeout((key:number) => {
      // this.messges.
      console.log(key);
      this.msgs.delete(key);

    }, 50000,this.index);
  }

}
