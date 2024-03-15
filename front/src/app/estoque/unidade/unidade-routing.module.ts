import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BuilderRoute} from "../../util/RouteUtil";
import {UnidadeBuscaComponent} from "./unidade-busca.component";


// export const UNIDADE_MENU:BreadMenuItem            =
  // BreadMenuItem.builder(new BreadMenuItem(/*root route*/'user','Usuários',0,-1).createRoute({component:UserControlComponent,canActivateChild:[Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,Guards.CAN_ACTIVATE_CHILD_PERMISSAO],permissao: ['user']}))
  //           .addChildren(new BreadMenuItem('buscar','Buscar Usuários',1,0).createRoute({component:UserBuscaComponent}))
  //           .addChildren(new BreadMenuItem('listar/:tipo/:busca','Lista de Usuários',2,1).createRoute({component:UserListComponent}))
  //           .addChildren(new BreadMenuItem('editar/:idUsuario','Editar Usuário',3,1).createRoute({component:UserFormComponent}))
  //           .addChildren(new BreadMenuItem('novo','Novo Usuário',4,0).createRoute({component:UserFormComponent}));

export const BUILDER_MENU_UNIDADE:BuilderRoute = new BuilderRoute().createRoot('Unidade','unidade',UnidadeBuscaComponent,['permissao'])
  .createLocal('Buscar Unidade', 1, 0, 'buscar', UnidadeBuscaComponent, ['unidade']).localToRoot()
  .createLocal('Lista Unidades', 2, 1, 'listar/:unidade', UnidadeBuscaComponent, ['unidade']).localToRoot()
  .openFatherMenu('Configuração')
  .createLocal('Editar Unidade', 3, 2, 'editar/:unidade', UnidadeBuscaComponent, ['unidade']).localToRoot()
  .closefatherMenu()
;

// console.log(BUILDER_MENU_UNIDADE.getRoutes())
// console.log(BUILDER_MENU_UNIDADE.getMenuItems())

@NgModule({
  imports: [RouterModule.forChild([BUILDER_MENU_UNIDADE.getRoutes()])],
  exports: [RouterModule],
  declarations:[]
})
export class UnidadeRoutingModule { }
