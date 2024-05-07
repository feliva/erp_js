import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeBuscaComponent} from "./unidade-busca.component";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNGAppUse} from "../../prime-ng-app-use.module";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {UserRoutingModule} from "../../user/user-routing.module";
import {ComponentsModule} from "../../components/components.module";
import {UnidadeListComponent} from "./unidade-list.component";
import {UnidadeFormComponent} from "./unidade-form.component";



@NgModule({
  declarations: [
    UnidadeBuscaComponent,
    UnidadeListComponent,
    UnidadeFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGAppUse,
    SharedModule,
    RouterModule,
    ComponentsModule,
    UnidadeRoutingModule,
  ]
})
export class UnidadeModule { }
