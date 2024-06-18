import {NgModule} from '@angular/core';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';
import {TesteRouteReuseStrategy} from "./util/TesteReuseStrategy";

const routes: Routes = [
  {path:'estoque',loadChildren: () => import('./estoque/produto/produto.module').then(m => m.ProdutoModule)},
  {path:'estoque', loadChildren: () => import('./estoque/unidade/unidade.module').then(m => m.UnidadeModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  providers:[
    // {provide:RouteReuseStrategy,useClass:TesteRouteReuseStrategy}
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
