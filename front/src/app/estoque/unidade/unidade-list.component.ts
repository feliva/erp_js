import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BreadcrumbService} from "../../components/breadcrumb/breadcrumb.service";
import {UnidadeService} from "../../service/unidade.service";
import {TipoBusca} from "../../util/constantes.util";

@Component({
  selector: 'unidade-list',
  template: `
      <p-panel header="Busca de Unidade">

          list
      </p-panel>
  `,
  styles: [`

  `]
})
export class UnidadeListComponent {

    constructor(private router:Router,
                private activatedRoute:ActivatedRoute,
                private messageService:MessageService,
                private breadservice:BreadcrumbService,
                private unidadeService:UnidadeService){
    }



    protected readonly TipoBusca = TipoBusca;
}
