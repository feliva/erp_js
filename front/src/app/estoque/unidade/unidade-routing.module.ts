import {NgModule} from '@angular/core';
import {RouterModule, Routes,Route} from '@angular/router';

import {BuilderRoute} from "../../util/RouteUtil";
import {UnidadeBuscaComponent} from "./unidade-busca.component";
import {UnidadeListComponent} from "./unidade-list.component";
import {UnidadeFormComponent} from "./unidade-form.component";


// export const UNIDADE_MENU:BreadMenuItem            =
  // BreadMenuItem.builder(new BreadMenuItem(/*root route*/'user','Usuários',0,-1).createRoute({component:UserControlComponent,canActivateChild:[Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,Guards.CAN_ACTIVATE_CHILD_PERMISSAO],permissao: ['user']}))
  //           .addChildren(new BreadMenuItem('buscar','Buscar Usuários',1,0).createRoute({component:UserBuscaComponent}))
  //           .addChildren(new BreadMenuItem('listar/:tipo/:busca','Lista de Usuários',2,1).createRoute({component:UserListComponent}))
  //           .addChildren(new BreadMenuItem('editar/:idUsuario','Editar Usuário',3,1).createRoute({component:UserFormComponent}))
  //           .addChildren(new BreadMenuItem('novo','Novo Usuário',4,0).createRoute({component:UserFormComponent}));

export const BUILDER_MENU_UNIDADE:BuilderRoute = new BuilderRoute()
  .redirectOfTo('unidade','unidade/buscar').localToRoot()
  .navOpen('Unidade').associateWithRote()
    .createLocal('Buscar Unidade', 1, 0, 0,'estoque/unidade/buscar', UnidadeBuscaComponent, ['unidade']).localToRoot()
    .createLocal('Lista Unidades', 2, 1, 0, 'unidade/listar/:termoBusca', UnidadeListComponent, ['unidade']).localToRoot()
    .createLocal('Editar Unidade', 3, 2, 0,'unidade/editar/:idUnidade', UnidadeFormComponent, ['unidade']).localToRoot()
;

// console.log(BUILDER_MENU_UNIDADE.getRoutes())
// console.log(BUILDER_MENU_UNIDADE.getMenuItems())

@NgModule({
  imports: [RouterModule.forChild(BUILDER_MENU_UNIDADE.getRoutes())],
  exports: [RouterModule],
  declarations:[]
})
export class UnidadeRoutingModule { }
