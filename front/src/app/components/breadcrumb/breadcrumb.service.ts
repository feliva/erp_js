import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {BreadCrumbMenuItem, BreadCrumbUtil} from "./BreadCrumbMenuItem.class";


@Injectable({providedIn:'root'})
export class BreadcrumbService{

  mm:BreadCrumbMenuItem[] = [];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  addItem(bread:BreadCrumbMenuItem):boolean{
    if(bread.first){//se for os primeiros componente, reinicia dos bradcrumbs
      this.mm = []
    }

    if(this.getTop() === bread){
      return true;
    }

    this.mm.push(BreadCrumbUtil.SEPARATOR);
    this.mm.push(bread);
    return true;
  }

  public pop():BreadCrumbMenuItem|undefined{
    let item = this.mm.pop();//item
    this.mm.pop();//separador
    return item;
  }

  public navigate(item:BreadCrumbMenuItem){
    console.log(this.activatedRoute)
    console.log('BreadcrumbService.navigate');
    let sub:BreadCrumbMenuItem[] = [];
    for (let element of this.mm) {
      sub.push(element);
      if(element.url == item.url){
        break;
      }
    }
    this.mm = sub;
    this.router.navigate([item.url], { relativeTo: this.activatedRoute });
  }

  toTop(){
    let menu = this.getTop()
    if(menu?.url) {
      this.router.navigateByUrl(menu?.url);
    }
  }

  getTop() {
    console.log(this.mm)
    if (this.mm !=undefined && this.mm.length != 0) {
      return this.mm[this.mm.length - 1];
    }else{
      return undefined;
    }
  }
}
