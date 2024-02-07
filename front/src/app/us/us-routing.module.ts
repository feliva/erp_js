import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from '../user/user-list.component';
import {UserFormComponent} from '../user/user-form.component';
import {UsControlComponent} from './us-control.component';
import {UsBuscaComponent} from './us-busca.component';

const routes: Routes = [
  { path: 'us', component: UsControlComponent },
  { path: 'buscar', component: UsBuscaComponent },
  { path: 'buscar/:busca', component: UsBuscaComponent },
  { path: 'listar', component: UserListComponent},
  { path: 'listar/:busca', component: UserListComponent},
  { path: 'edit/:id', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsRoutingModule { }
