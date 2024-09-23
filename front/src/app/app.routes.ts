import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {TesteRouteReuseStrategy} from "./util/TesteReuseStrategy";

export const APP_ROUTES: Routes = [
  {path:'estoque/movimentacao',loadChildren: () => import('./estoque/movimentacao/movimentacao.routes').then(m => m.BUILDER_MENU_MOVIMENTACAO.getRoutes())},
  {path:'estoque/produto',loadChildren: () => import('./estoque/produto/produto.routes').then(m => m.BUILDER_MENU_PRODUTO.getRoutes())},
  {path:'estoque/unidade', loadChildren: () => import('./estoque/unidade/unidade.router').then(m => m.BUILDER_MENU_UNIDADE.getRoutes())},

];
