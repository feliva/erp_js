import {MenuItem} from "primeng/api";
import {RouteP} from "../../util/RouteUtil";

export interface BreadCrumbMenuItem extends MenuItem{
  index?:number;
  before?:number;
  path?:string;//é o path do router
  route?:RouteP;
}

export class BreadCrumbUtil{
  static readonly SEPARATOR:BreadCrumbMenuItem = this.createSeparator();

  static  builder(path:string,label:string,index:number,before:number):BreadCrumbMenuItem {
    let bre:BreadCrumbMenuItem ={};
    bre.path = path;
    return bre;
  }

  static createSeparator():BreadCrumbMenuItem{
    let bread:BreadCrumbMenuItem = {
      path : '#',
      label : '>',
      index : -2,
      before : -2,
      styleClass : 'p-menuitem-separator',
      separator : true
    };
    return bread;
  }

}

