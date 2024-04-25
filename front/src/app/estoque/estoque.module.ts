import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UnidadeModule} from "./unidade/unidade.module";
import {ComponentsModule} from "../components/components.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UnidadeModule,
    ComponentsModule
  ]
})
export class EstoqueModule { }
