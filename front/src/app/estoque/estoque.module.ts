import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeModule} from "./unidade/unidade.module";

import {ProdutoModule} from "./produto/produto.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    ProdutoModule
]
})
export class EstoqueModule { }
