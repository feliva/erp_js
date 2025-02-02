import {ActivatedRouteSnapshot, CanActivateChildFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";

export class Guards {


  static CAN_ACTIVATE_CHILD_BREADCRUMB: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    let item: BreadCrumbMenuItem = route.data['breadMenuItem'];
    item.url = state.url;
    const service = inject(BreadcrumbService);
    if(route.data['resetBreadCrumb']){
      service.reset()
    }
    return service.addItem(item);
  };

  static CAN_ACTIVATE_CHILD_PERMISSAO: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) => {
    // let item: BreadCrumbMenuItem = route.data['breadMenuItem'];
    // item.url = state.url;
    return true;//inject(BreadcrumbService).addItem(item);
  };

}
