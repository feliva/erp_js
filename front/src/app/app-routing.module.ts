import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuilderRoute} from "./util/RouteUtil";
import {UnidadeBuscaComponent} from "./estoque/unidade/unidade-busca.component";
import {UnidadeListComponent} from "./estoque/unidade/unidade-list.component";

const routes: Routes = [
  {path: '',loadChildren: () => import('./us/us.module').then(m => m.UsModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  //http://localhost:4200/estoque/unidade/buscar
  {path:'unidade', loadChildren: () => import('./estoque/unidade/unidade.module').then(m => m.UnidadeModule)},
  // {path:'estoque/unidade/buscar',component:UnidadeBuscaComponent},
  // {path:'estoque/unidade/listar/:termo',component:UnidadeListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
