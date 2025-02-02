import {Route, Routes} from "@angular/router";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";
import {Guards} from "./Guards";
import {Type} from "@angular/core";


export interface RouteP extends Route{
  permissao?:Array<string>;
  // tela:number;
  breadCrumbMenuItem?:BreadCrumbMenuItem;
}


export class BuilderRoute{

  rootRoute:RouteP[] = [];
  localRoute?:RouteP | undefined;
  rootMenuitem:BreadCrumbMenuItem[] = [];

  pilhaMenuNav:BreadCrumbMenuItem[] = [];

  localItem?:BreadCrumbMenuItem;
  associarItem?:BreadCrumbMenuItem;

  masterPath:string = '';

  constructor(masterPath:string) {
    this.masterPath = masterPath;
  }

  first(){
    if(this.localItem) {
      this.localItem.first = true;
    }
    return this;
  }

  createLocal(label:string,path:string,component : Type<any>, permissao:Array<string>):BuilderRoute{
    this.localRoute = {
      path:path, //não precisa do masterPath pq vem do roteadr
      component:component,
      permissao:permissao,
      // tela:tela,
      canActivate : [
        Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,
        Guards.CAN_ACTIVATE_CHILD_PERMISSAO]
      ,
      data:{}
    }


    this.localItem = {
      label:label,
      first:false,
      routerLink: this.masterPath + path,//para os links staticos
      routerLinkActiveOptions:'teste'
      ,styleClass:'rounded-none',
    }
    return this;
  }

  addRouteData(data:{[key: string | symbol]:any}){
    if(this.localRoute != undefined) {//so pra para o erro do typescript
      if (this.localRoute?.data != undefined) {
        Object.assign(this.localRoute.data, data)
      } else {
        this.localRoute.data = data;
      }
    }else{
      throw new Error('Crie primeiro a rota antes de adicionar dados');
    }
    return this;
  }

  resetFlag(){
    if(this.localRoute != undefined) {//so pra para o erro do typescript
      if (this.localRoute?.data != undefined) {
        Object.assign(this.localRoute.data, {resetBreadCrumb:true})
      } else {
        this.localRoute.data = {resetBreadCrumb:true};
      }
    }else{
      throw new Error('Crie primeiro a rota antes de adicionar dados');
    }

    return this;
  }

  navOpen(label:string):BuilderRoute{
    this.localItem = {
      label:label,
      expanded:true,
      items:[]
    }

     if(this.rootMenuitem.length == 0) {
       this.rootMenuitem.push(this.localItem);
       this.pilhaMenuNav.push(this.localItem);
     }else{
      let menu = this.pilhaMenuNav[this.pilhaMenuNav.length-1];
      menu?.items?.push(this.localItem);
    }

    this.localItem = undefined;

    return this;
  }
  navOpenChildren(label:string):BuilderRoute{
    this.localItem = {
      label:label,
      expanded:true,
      items:[]
    }

    let topo:BreadCrumbMenuItem = this.pilhaMenuNav[this.pilhaMenuNav.length-1];
    topo?.items?.push(this.localItem);
    this.pilhaMenuNav.push(this.localItem);
    return this;
  }

  navCloseChildren(){
    console.debug(this.pilhaMenuNav.pop());
    return this;
  }

  associateWithRote(){
    if(this.pilhaMenuNav.length == 0 ){
      throw Error('voce deve criar um menu primeiro')
    }else{
      this.associarItem = this.pilhaMenuNav[this.pilhaMenuNav.length-1];
    }
    return this;
  }

  closefatherMenu():BuilderRoute{
    this.pilhaMenuNav = this.rootMenuitem;
    return this;
  }

  addChildrenToRoot(route:RouteP):BuilderRoute{
    //   this.rootRoute.children = [];
    // }  if(this.rootRoute.children === undefined ){


    this.rootRoute.push(route);

    return this;
  }

  addToRoot(route:RouteP):BuilderRoute{
    this.rootRoute.push(route);
    return this;
  }

  localCreateRoute(path:string,component : Type<any>, permissao:Array<string>):BuilderRoute{
    this.localRoute = {
      path:path,
      component:component,
      permissao:permissao,
      // tela:0
    }
    return this;
  }

  localCreateBreadCrumbMenuItem(label:string,index:number,before:number):BuilderRoute{
    this.localItem = {
      label:label,
      index:index,
      before:before
    }
    return this;
  }

  localToRoot():BuilderRoute{
    if(this.localRoute === undefined ){
      throw Error("Rota nao definida!");
    }

    //quando criamos um menu podemos associar uma rota a ele e resetar a associação
    if(this.associarItem !== undefined){
      this.associarItem.routerLink = this.localItem?.routerLink;
      this.associarItem = undefined;
    }

    if(this.localRoute.data == undefined) {
      this.localRoute.data = {'breadMenuItem': this.localItem};
    }else{
      Object.assign(this.localRoute.data , {'breadMenuItem': this.localItem});
    }

    // console.log(this.localRoute.data)

    this.rootRoute.push(this.localRoute);

    this.localItem = undefined;
    this.localRoute = undefined;

    return this;
  }

  redirectOfTo(path:string, urlRedirect:string){
    this.localRoute = {
      redirectTo : urlRedirect,
      pathMatch : 'full',
      // tela:0,
      path : path
    }

    return this;
  }

  getRoutes():Routes{
    return this.rootRoute;
  }

  getMenuItems():BreadCrumbMenuItem[]{
    return this.rootMenuitem;
  }

}
