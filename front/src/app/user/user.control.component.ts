import {Component} from '@angular/core';
import {BreadcrumbService} from '../components/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-user.control',
  template: `
    <app-breadcrumb></app-breadcrumb>
    <router-outlet
    (activate)='onActivate($event)'
    (deactivate)='onDeactivate($event)'
    (attach)='onAttach($event)' (detach)="onDetach($event)"
    ></router-outlet>`,
  styles: [
  ]
})
export class UserControlComponent {
  numbero: number = Math.floor(Math.random() * 2000);

  constructor(public breadService:BreadcrumbService){
  }

  getRandom():number{
    let teste = Math.floor(Math.random() * 2000);
    console.log(teste);
    return teste;
  }

  onActivate($event:any){
    // let u:UserBuscaComponent = $event;
    // u.listUsuarios = [new Usuario()]
    console.log('onActivate');
    // console.log($event);
  }

  onDeactivate($event:any){
    console.log('onDeactivate');
    console.log($event);
  }
  onAttach($event:any){
    console.log('onAttach');
    console.log($event);
  }
  onDetach($event:any){
    console.log('onDetach');
    console.log($event);
  }

}
