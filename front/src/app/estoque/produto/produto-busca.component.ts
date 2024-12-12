import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  inject,
  Input,
  input,
  OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import {TipoBusca} from "../../util/constantes.util";
import {UnidadeControlService} from "../../controllers/unidade-control.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterPreloader,
  RouterStateSnapshot
} from "@angular/router";
import {RouteP} from "../../util/RouteUtil";
import {Location} from "@angular/common";
import {ProdutoService} from "../../service/produto.service";
import {forkJoin, Observable} from "rxjs";
import {Produto} from "../../model/Produto";
import {LazyLoadEvent} from "primeng/api";
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import { FormControl, FormGroup, Validators, FormsModule } from "@angular/forms";
import {UnidadeService} from "../../service/unidade.service";
import {Unidade} from "../../model/Unidade";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'produto-busca',
    template: `
    <div >
      <p-panel header="Busca de Produto" >

        <div class="formgrid grid grid-cols-12 gap-4 grid-cols-12 gap-6">
          <div class="field col-span-12 md:col-span-12">
            <div class="flex flex-wrap gap-6">
              <div class="flex items-center">
                <label class="ml-2">Descrição</label>
              </div>
            </div>
          </div>
          <div class="field col-span-12 md:col-span-6">
            <input type="text" pInputText  placeholder="Descrição" class="w-full" [(ngModel)]="this.termoBusca"/>
          </div>
        </div>
        <div>
          <p-button label="Buscar" (click)="this.buscar()" icon="pi pi-search" class="pr-6"></p-button>
          <p-button label="Novo" (click)="this.produtoCS.novoProduto()"  icon="pi pi-plus"></p-button>
        </div>
      </p-panel>
    </div>
  `,
    styles: [`

  `],
    standalone: true,
    imports: [
        PanelModule,
        FormsModule,
        InputTextModule,
        ButtonModule,
    ],
})
export class ProdutoBuscaComponent implements AfterViewInit,OnInit {

  termoBusca:string='';

  produtoCS:ProdutoControlService = inject(ProdutoControlService);

  constructor(){
  }

  public buscar(){
    this.produtoCS.buscar(this.termoBusca);
  }

  ngAfterViewInit(): void {
    this.produtoCS.inicializaFluxoNormal();
    console.log( 'ngAfterViewInit!!!!!!!!!!!!!!!!!!!!!!');
  }

  ngOnInit() {
    console.log( 'oninit!!!!!!!!!!!!!!!!!!!!!!');
  }
}
