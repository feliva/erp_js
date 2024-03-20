import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'us',loadChildren: () => import('./us/us.module').then(m => m.UsModule)},
  {path:'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  //http://localhost:4200/estoque/unidade/buscar
  {path:'unidade', loadChildren: () => import('./estoque/unidade/unidade.module').then(m => m.UnidadeModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
