import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeModule} from "./unidade/unidade.module";
import {ComponentsModule} from "../components/components.module";
import {ProdutoModule} from "./produto/produto.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    ProdutoModule,
    ComponentsModule
  ]
})
export class EstoqueModule { }
