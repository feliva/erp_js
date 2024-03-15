import {Route} from "@angular/router";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";
import {Guards} from "./Guards";
import {MenuItem} from "primeng/api";
import {Type} from "@angular/core";


export interface RouteP extends Route{
  permissao?:Array<string>;
  breadCrumbMenuItem?:BreadCrumbMenuItem;
}


export class BuilderRoute{

  rootRoute:RouteP = {};
  localRoute?:RouteP;
  rootMenuitem:BreadCrumbMenuItem = {};
  fatherItems?:BreadCrumbMenuItem;
  localItem?:BreadCrumbMenuItem;
  rootPath:string = '';

  createRoot(label:string, path : string,component : Type<any>, permissao:Array<string>) : BuilderRoute {
    this.rootPath = path;
    this.rootRoute = {
      canActivateChild : [Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,Guards.CAN_ACTIVATE_CHILD_PERMISSAO],
      permissao : permissao,
      component : component,
      path : path
    }

    this.rootMenuitem = {
      label:label,
      expanded:true,
      items:[]
    }
    this.fatherItems = this.rootMenuitem;
    return this;
  }

  createLocal(label:string,index:number,before:number,path:string,component : Type<any>, permissao:Array<string>):BuilderRoute{
    this.localRoute = {
      path:path,
      component:component,
      permissao:permissao
    }
    this.localItem = {
      label:label,
      index:index,
      before:before,
      routerLink:this.rootPath + '/'+path
    }
    return this;
  }

  openFatherMenu(label:string):BuilderRoute{
    this.localItem = {
      label:label,
      expanded:true,
      items:[]
    }
    this.fatherItems?.items?.push(this.localItem);
    this.fatherItems = this.localItem;
    this.localItem = undefined;

    return this;
  }

  closefatherMenu():BuilderRoute{
    this.fatherItems = this.rootMenuitem;
    return this;
  }

  addChildrenToRoot(route:RouteP):BuilderRoute{
    if(this.rootRoute.children === undefined ){
      this.rootRoute.children = [];
    }

    this.rootRoute.children.push(route);

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

    if(this.fatherItems !== undefined && this.localItem !== undefined ){
      this.fatherItems.items?.push(this.localItem);
    }

    this.localRoute.data = {'breadMenuItem':this.localItem};

    this.addChildrenToRoot(this.localRoute);

    this.localItem = undefined;
    this.localRoute = undefined;

    return this;

  }

  getRoutes():Route{
    return this.rootRoute;
  }

  getMenuItems():BreadCrumbMenuItem{
    return this.rootMenuitem;
  }

}
