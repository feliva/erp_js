import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';

import {UserFormComponent} from './user-form.component';
import {SharedModule} from "../shared/shared.module";
import {PrimeNGAppUse} from '../prime-ng-app-use.module';
import {UserBuscaComponent} from './user-busca.component';
import {UserListComponent} from './user-list.component';
import {UserControlComponent} from './user.control.component';
import {UserRoutingModule} from './user-routing.module';
import {ComponentsModule} from '../components/components.module';


@NgModule({
  declarations: [
    UserFormComponent,
    UserBuscaComponent,
    UserListComponent,
    UserControlComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGAppUse,
    SharedModule,
    RouterModule,
    UserRoutingModule,
    ComponentsModule
  ],
  exports:[
  ],
})
export class UserModule { }
