import {Route, ROUTES, Routes} from "@angular/router";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";
import {Guards} from "./Guards";
import {MenuItem} from "primeng/api";
import {Type} from "@angular/core";


export interface RouteP extends Route{
  permissao?:Array<string>;
  breadCrumbMenuItem?:BreadCrumbMenuItem;
}


export class BuilderRoute{

  rootRoute:RouteP[] = [];
  localRoute?:RouteP | undefined;
  rootMenuitem:BreadCrumbMenuItem[] = [];

  pilhaMenuNav:BreadCrumbMenuItem[] = [];

  localItem?:BreadCrumbMenuItem;
  associarItem?:BreadCrumbMenuItem;

  createLocal(label:string,index:number,before:number,path:string,component : Type<any>, permissao:Array<string>):BuilderRoute{
    this.localRoute = {
      path:path,
      component:component,
      permissao:permissao,
      canActivate : [Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,Guards.CAN_ACTIVATE_CHILD_PERMISSAO]
    }
    this.localItem = {
      label:label,
      index:index,
      before:before,
      routerLink:path
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
      permissao:permissao
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

    this.localRoute.data = {'breadMenuItem':this.localItem};

    this.rootRoute.push(this.localRoute);

    this.localItem = undefined;
    this.localRoute = undefined;

    return this;
  }

  redirectOfTo(path:string, urlRedirect:string){
    this.localRoute = {
      redirectTo : urlRedirect,
      pathMatch : 'full',
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
