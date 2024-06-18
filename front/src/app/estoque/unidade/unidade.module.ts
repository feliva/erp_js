import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeBuscaComponent} from "./unidade-busca.component";
import {UnidadeRoutingModule} from "./unidade-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNGAppUse} from "../../prime-ng-app-use.module";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";

import {UnidadeListComponent} from "./unidade-list.component";
import {UnidadeFormComponent} from "./unidade-form.component";



@NgModule({
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGAppUse,
    SharedModule,
    RouterModule,
    UnidadeRoutingModule,
    UnidadeBuscaComponent,
    UnidadeListComponent,
    UnidadeFormComponent,
]
})
export class UnidadeModule { }
