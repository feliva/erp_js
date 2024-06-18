import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PrimeNGAppUse} from "../../prime-ng-app-use.module";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../../components/components.module";
import {ProdutoRoutingModule} from "./produto-routing.module";
import {ProdutoBuscaComponent} from "./produto-busca.component";
import {ProdutoListarComponent} from "./produto-listar.component";
import {ProdutoFormComponent} from "./produto-form.component";
import {ProdutoControlService} from "../../controllers/produto-control.service";



@NgModule({
  declarations: [
    ProdutoBuscaComponent,
    ProdutoListarComponent,
    ProdutoFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGAppUse,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ProdutoRoutingModule,
  ],
  // providers:[ProdutoControlService],

})
export class ProdutoModule { }
