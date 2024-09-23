import {MenuItem} from "primeng/api";
import {RouteP} from "../../util/RouteUtil";

export interface BreadCrumbMenuItem extends MenuItem{
  first?:boolean;
  path?:string;//é o path do router
  route?:RouteP;
}

export class BreadCrumbUtil{
  static readonly SEPARATOR:BreadCrumbMenuItem = this.createSeparator();

  static createSeparator():BreadCrumbMenuItem{
    let bread:BreadCrumbMenuItem = {
      path : '#',
      label : '>',
      first : false,
      // before : -2,
      styleClass : 'p-menuitem-separator',
      separator : true
    };
    return bread;
  }

}

