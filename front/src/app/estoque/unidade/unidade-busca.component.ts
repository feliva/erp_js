import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BreadcrumbService} from "../../components/breadcrumb/breadcrumb.service";
import {UnidadeService} from "../../service/unidade.service";
import {TipoBusca} from "../../util/constantes.util";
import {UnidadeControlService} from "../../controllers/unidade-control.service";

@Component({
  selector: 'unidade-busca',
  template: `
      <p-panel header="Busca de Unidade">

          <div class="formgrid grid">
              <div class="field col-12 md:col-12">
                  <div class="flex flex-wrap gap-3">
                      <div class="flex align-items-center">
                          <label class="ml-2">Descrição</label>
                      </div>
                  </div>
              </div>
              <div class="field col-12 md:col-6">
                  <input type="text" pInputText  placeholder="Descrição" class="w-full" [(ngModel)]="termoBusca"/>
              </div>
          </div>
          <div>
              <p-button label="Buscar" (click)="this.buscar()" icon="pi pi-search" class="pr-3"></p-button>
<!--              <p-button label="Novo" routerLink="/user/novo" icon="pi pi-plus"></p-button>-->
          </div>
      </p-panel>
  `,
  styles: [`

  `]
})
export class UnidadeBuscaComponent {

  termoBusca:string=''
  unidadeControl:UnidadeControlService = inject(UnidadeControlService);
    constructor(){
    }

    public buscar(){
      this.unidadeControl.setTermoBusca(this.termoBusca)
      this.unidadeControl.buscar();
    }

    protected readonly TipoBusca = TipoBusca;
}
