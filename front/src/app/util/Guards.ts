import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";

export class Guards {

  static GUARD_CAN_ACTIVATE: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // console.log(route)
    // console.log(state)
    let item: BreadCrumbMenuItem = route.data['breadMenuItem'];
    item.url = state.url;
    return inject(BreadcrumbService).addItem(item);
  };

  static CAN_ACTIVATE_CHILD_BREADCRUMB: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    let item: BreadCrumbMenuItem = route.data['breadMenuItem'];
    item.url = state.url;
    return inject(BreadcrumbService).addItem(item);
  };

  static CAN_ACTIVATE_CHILD_PERMISSAO: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    // let item: BreadCrumbMenuItem = route.data['breadMenuItem'];
    // item.url = state.url;
    return true;//inject(BreadcrumbService).addItem(item);
  };

}
