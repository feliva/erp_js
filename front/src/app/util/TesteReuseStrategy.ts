import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class TesteRouteReuseStrategy implements RouteReuseStrategy {
  private storedHandles: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * Para alterar o comportamento padrao de reutilização do mesmo componente
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
