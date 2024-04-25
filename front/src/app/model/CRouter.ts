import {Route} from "@angular/router";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";

export interface CRoute extends Route{
  permissao?:Array<string>;
  breadCrumbMenuItem?:BreadCrumbMenuItem;
}
