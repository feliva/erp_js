import {
  AfterViewInit,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { FormsModule } from "@angular/forms";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import {CalendarModule} from "primeng/calendar";
import {TipoMovimentacao} from "../../model/TipoMovimentacao";
import {MovimentacaoControlService} from "./movimentacao-control.service";
import {TipoMovimentacaoService} from "../../service/tipo-movimentacao.service";
import {RadioButtonModule} from "primeng/radiobutton";
import {DropdownModule} from "primeng/dropdown";
import {Router} from "@angular/router";
import {Produto} from "../../model/Produto";

@Component({
    selector: 'movimentacao-busca',
    template: `
    <div >
      <p-panel header="Busca movimentação" >

        <div class="formgrid grid grid-cols-12 gap-4 grid-cols-12 gap-6">
          <div class="field col-span-12 md:col-span-6">
            <div class="flex flex-wrap gap-6">
              <label class="ml-2">Data</label>
               <p-calendar [(ngModel)]="this.data"  class="w-full" placeholder="Data"></p-calendar>
            </div>
          </div>
          <div class="field col-span-12 md:col-span-12">
            <div class="flex flex-wrap gap-6">
              <label class="ml-2">Tipo da movimentação</label>
              <div class="w-full">
                @for (item of this.listaTipoMovimentacao;track item){
                    <p-radioButton [inputId]="item.nome" [value]="item" [(ngModel)]="this.tipoMovimentacao"  class="pr-6" />
                    <label>{{item.descricao}}</label>
                }
              </div>
            </div>
          </div>
        </div>
        <div>
          <p-button label="Buscar" (click)="this.buscar()" icon="pi pi-search" class="pr-6"></p-button>
          <p-button label="Nova" (click)="this.movimentacaoCS.novo()"  icon="pi pi-plus"></p-button>
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
    CalendarModule,
    RadioButtonModule,
    DropdownModule
  ],
})
export class MovimentacaoBuscaComponent implements AfterViewInit,OnInit {

  data!:Date;
  produto?:Produto;
  tipoMovimentacao:TipoMovimentacao = TipoMovimentacao.ALL;

  listaTipoMovimentacao?:TipoMovimentacao[];

  movimentacaoCS:MovimentacaoControlService = inject(MovimentacaoControlService)
  tipoMovimentacaoService:TipoMovimentacaoService = inject(TipoMovimentacaoService)
  router:Router = inject(Router);

  constructor(){
  }

  public buscar(){
    let filtros:any = {
      tipoMovimentacao: this.tipoMovimentacao.nome
    }

    if(this.data ){
      filtros.data = this.data.getTime();
    }
    if(this.produto){
      filtros.idProduto = this.produto.idProduto;
    }

    this.router.navigate(['/estoque/movimentacao/listar/g',filtros])
    // this.movimentacaoCS.buscar(this.data,this.tipoMovimentacao);
  }

  ngAfterViewInit(): void {
    this.movimentacaoCS.inicializaFluxoNormal();
    console.log( 'ngAfterViewInit!!!!!!!!!!!!!!!!!!!!!!');
  }

  ngOnInit() {
    this.tipoMovimentacaoService.listAll().subscribe(lTipoMovimentacao => {
      //gambi para funcionar o radio com os objetos
      lTipoMovimentacao.forEach(tipo => {
        if (tipo.nome == TipoMovimentacao.ALL.nome) {
          this.tipoMovimentacao = tipo;
        }
      })
      console.log(lTipoMovimentacao)
      this.listaTipoMovimentacao = lTipoMovimentacao;
    })
  }
}
