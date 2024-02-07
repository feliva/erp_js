import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {BreadMenuItem} from './BreadcrumbMenuItem.class';


@Injectable({providedIn:'root'})
export class BreadcrumbService{

  mm:BreadMenuItem[] = [];

  static GUARD_CAN_ACTIVATE: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // console.log(route)
    // console.log(state)
    let item:BreadMenuItem = route.data['breadMenuItem'];
    item.url = state.url;
    return inject(BreadcrumbService).addItem(item);
  };

  static GUARD_CAN_ACTIVATE_CHILD: CanActivateChildFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot,) => {
      let item:BreadMenuItem = route.data['breadMenuItem'];
      item.url = state.url;
      return inject(BreadcrumbService).addItem(item);
  };

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  addItem(bread:BreadMenuItem):boolean{
    if(bread.index == undefined){
      throw Error("Item do breadcrumd devem ter o seu index preenchidos.");
    }

    if(bread.index <= 1 ){//se for os primeiros componente, reinicia dos bradcrumbs
      this.mm = []
    }

    this.mm.push(BreadMenuItem.SEPARATOR);
    this.mm.push(bread);
    return true;
  }

  public navigate(item:BreadMenuItem){
    console.log(this.activatedRoute)
    console.log(this.router)
    let sub:BreadMenuItem[] = [];
    for (let element of this.mm) {
      if(element.url == item.url){
        sub.pop();//retira o ultimo separador e não add o novo item, pois sera add postetiormente os dois
        break;
      }else{
        sub.push(element);
      }
    }
    this.mm = sub;
    this.router.navigate([item.url], { relativeTo: this.activatedRoute });
  }

  private getLastRoute(activeRoute:ActivatedRoute):ActivatedRouteSnapshot {
    if (activeRoute.snapshot.children == undefined) {
      return activeRoute.snapshot;
    } else {
      return this.getLastRoute(activeRoute);
    }
  }
}
