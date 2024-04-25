import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserBuscaComponent} from "./user-busca.component";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {UserControlComponent} from "./user.control.component";
import {UserListComponent} from "./user-list.component";
import {UserFormComponent} from "./user-form.component";
import {Guards} from "../util/Guards";
import {BuilderRoute} from "../util/RouteUtil";


// export const USER_MENU:BreadMenuItem            =
//   BreadMenuItem.builder(new BreadMenuItem(/*root route*/'user','Usuários',0,-1).createRoute({component:UserControlComponent,canActivateChild:[Guards.CAN_ACTIVATE_CHILD_BREADCRUMB,Guards.CAN_ACTIVATE_CHILD_PERMISSAO],permissao: ['user']}))
//             .addChildren(new BreadMenuItem('buscar','Buscar Usuários',1,0).createRoute({component:UserBuscaComponent}))
//             .addChildren(new BreadMenuItem('listar/:tipo/:busca','Lista de Usuários',2,1).createRoute({component:UserListComponent}))
//             .addChildren(new BreadMenuItem('editar/:idUsuario','Editar Usuário',3,1).createRoute({component:UserFormComponent}))
//             .addChildren(new BreadMenuItem('novo','Novo Usuário',4,0).createRoute({component:UserFormComponent}));
export const BUILDER_USER_MENU:BuilderRoute =
  new BuilderRoute()
    .createLocal('Buscar uaurios',1,0,'buscar',UserBuscaComponent,['user']).localToRoot()
    .createLocal('Lista de Usuários',2,1,'listar/:tipo/:busca',UserListComponent,['user']).localToRoot()
    .createLocal('Editar Usuário',3,1,'editar/:idUsuario',UserFormComponent,['user']).localToRoot()
    .createLocal('Novo Usuário',4,0,'novo',UserFormComponent,['user']).localToRoot();

@NgModule({
  imports: [RouterModule.forChild(BUILDER_USER_MENU.getRoutes())],
  exports: [RouterModule],
  declarations:[]
})
export class UserRoutingModule { }
