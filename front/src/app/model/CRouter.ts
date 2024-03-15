import {Route} from "@angular/router";
import {BreadMenuItem} from "../components/breadcrumb/BreadMenuItem.class";

export interface CRoute extends Route{
  permissao?:Array<string>;
  breadCrumbMenuItem?:BreadMenuItem;
}
