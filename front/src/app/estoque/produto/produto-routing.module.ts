import {NgModule} from '@angular/core';
import {RouterModule, Routes, Route, RouteReuseStrategy} from '@angular/router';

import {BuilderRoute} from "../../util/RouteUtil";
import {ProdutoBuscaComponent} from "./produto-busca.component";
import {ProdutoListarComponent} from "./produto-listar.component";
import {ProdutoFormComponent} from "./produto-form.component";

export const BUILDER_MENU_PRODUTO:BuilderRoute = new BuilderRoute()
  .redirectOfTo('produto','produto/buscar').localToRoot()
  .navOpen('Produto').associateWithRote()
  .createLocal('Buscar Produto', 1, 0, 1,'produto/buscar', ProdutoBuscaComponent, ['produto']).localToRoot()
  .createLocal('Lista de Produtos', 2, 1,2, 'produto/listar/:termoBusca', ProdutoListarComponent, ['produto']).localToRoot()
  .createLocal('Editar Produto', 3, 2, 3,'produto/editar/:idProduto', ProdutoFormComponent, ['produto']).localToRoot()
  .createLocal('Novo Produto', 4, 1, 4,'produto/novo', ProdutoFormComponent, ['produto']).addRouteData({ehNovo:true}).localToRoot()
;

console.log(BUILDER_MENU_PRODUTO.getRoutes())
console.log(BUILDER_MENU_PRODUTO.getMenuItems())

@NgModule({
  imports: [RouterModule.forChild(BUILDER_MENU_PRODUTO.getRoutes())],
  declarations:[]
})
export class ProdutoRoutingModule {

  static CONF_ROUTE_BUSCA = {
    path: 'produto/buscar'
  }
  static CONF_ROUTE_LISTAR = {
    path: 'produto/listar/:termoBusca'
  }
}
