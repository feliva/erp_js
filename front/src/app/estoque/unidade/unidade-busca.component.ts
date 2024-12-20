import {Component, inject, OnDestroy} from '@angular/core';
import {TipoBusca} from "../../util/constantes.util";
import {UnidadeControlService} from "../../controllers/unidade-control.service";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'unidade-busca',
    template: `
      <p-panel header="Busca de Unidade">

          <div class="formgrid grid grid-cols-12 gap-4 grid-cols-12 gap-6">
              <div class="field col-span-12 md:col-span-12">
                  <div class="flex flex-wrap gap-6">
                      <div class="flex items-center">
                          <label class="ml-2">Descrição</label>
                      </div>
                  </div>
              </div>
              <div class="field col-span-12 md:col-span-6">
                  <input type="text" pInputText  placeholder="Descrição" class="w-full" [(ngModel)]="termoBusca"/>
              </div>
          </div>
          <div>
              <p-button label="Buscar" (click)="this.buscar()" icon="pi pi-search" class="pr-6"></p-button>
<!--              <p-button label="Novo" routerLink="/user/novo" icon="pi pi-plus"></p-button>-->
          </div>
      </p-panel>
  `,
    styles: [`

  `],
    imports: [PanelModule, FormsModule, InputTextModule, ButtonModule]
})
export class UnidadeBuscaComponent implements OnDestroy{

  termoBusca:string=''
  unidadeControl:UnidadeControlService = inject(UnidadeControlService);
    constructor(){

    }

    public buscar(){
      this.unidadeControl.setTermoBusca(this.termoBusca)
      this.unidadeControl.buscar();
    }

    protected readonly TipoBusca = TipoBusca;

  ngOnDestroy() {
    console.log("Parent ngOnDestroy() unidade");
  }
}
