import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  carregando:boolean = false;
  totalRequests:number = 0;
  constructor() { }

  start(){
    console.debug('start')
    this.totalRequests++;
    this.carregando = true;
  }

  stop(){
    this.totalRequests--;
    if(this.totalRequests <= 0){
      this.carregando = false;
      this.totalRequests = 0;
      console.debug('stop')
    }
  }
}
