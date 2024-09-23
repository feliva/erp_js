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
import {ActivatedRoute, Route, Router, RouterPreloader} from "@angular/router";
import {Produto} from "../../model/Produto";
import { TableLazyLoadEvent, TablePageEvent, TableModule } from "primeng/table";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import {ConfirmationService, FilterMetadata, MessageService, SharedModule} from 'primeng/api';
import {OperacoesExcluir} from "../../model/OperacoesExcluir";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import {MovimentacaoBuscaComponent} from "./movimentacao-busca.component";
import {Movimentacao} from "../../model/Movimentacao";
import {MovimentacaoControlService} from "./movimentacao-control.service";
import {CommonModule, DatePipe} from "@angular/common";
import {map} from "rxjs";
import {FeTableComponent, TableLoadFilterEvent} from "../../components/fe-table/fe-table.component";
import {DiretivasModule, Template} from "../../shared/diretivas";

@Component({
    selector: 'produto-busca',
    template: `
    <div >

      <p-panel header="Lista de Produto" id="pnlListar" >
        <div *ngIf="false">
          <p-table  [value]="this.listMovimentacoes"  [tableStyle]="{'min-width': '60rem'}"
            [lazy]="true" dataKey="idProduto" sortMode="multiple"
                   [paginator]="true"
                   [rows]="rowsPage"
                   [totalRecords]="totalRegistros"
                   (onLazyLoad)="onLazyLoad($event)"
                   (onPage)="onPage($event)"
                   (firstChange)="firstChange($event)"
                   [rowsPerPageOptions]="[20,40,80,160]"
                   [globalFilterFields]="['produto.nome','dtMovimentacao']"
                   >
            <ng-template pTemplate="header">
              <tr>
                <th>Id</th>
                <th pSortableColumn="produto.nome" >
                  <div class="flex justify-content-between align-items-center">
                    Nome
                    <p-sortIcon field="produto.nome" />
                    <p-columnFilter type="text" field="produto.nome" display="menu" class="ml-auto" />
                  </div>
                </th>
                <th pSortableColumn="dtMovimentacao" >
                  <div class="flex justify-content-between align-items-center">
                    Data
                    <p-sortIcon field="dtMovimentacao" />
                    <p-columnFilter type="date" field="dtMovimentacao" display="menu" class="ml-auto" />
                  </div>
                </th>
                <th>V. Venda
                  <p-columnFilter type="text" field="tipoMovimentacao" display="menu" class="ml-auto" />
                </th>
                <th></th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr>
                <th>{{item.idMovimentacao}}</th>
                <th>{{item.produto.nome}}</th>
                <th>{{item.dtMovimentacao | date:'dd/MM/yyyy'}}</th>
                <th>{{item.tipoMovimentacao.descricao}}</th>
                <th>
                  <p-button icon="pi pi-eye" [rounded]="true" [text]="true"
                    (onClick)="this.mmovimetacaoCS.editar(item,$event)" ></p-button>
                </th>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </p-panel>
      <p-confirmDialog />

        <p-panel>
      <fe-table [values]="this.listMovimentacoes" key='idMovimentacao'
        (onLazyLoadEvent)="onLazyLoadEvent($event)" >
        <ng-template template="thead" pTemplate="thead" >
          <th>id</th>
          <th>Nome</th>
        </ng-template>
        <ng-template template="body" pTemplate="body" let-item>
            <th>{{item.idMovimentacao}}</th>
            <th>{{item.produto.nome}}</th>
        </ng-template>
      </fe-table>

        </p-panel>
  `,
    styles: [`

  `],
    standalone: true,
  imports: [CommonModule,PanelModule, TableModule, SharedModule, ButtonModule, ConfirmDialogModule, MovimentacaoBuscaComponent, DatePipe, FeTableComponent,DiretivasModule]
})
export class MovimentacaoListarComponent implements OnInit,OperacoesExcluir<Movimentacao>{

  rowsPage = 20;
  totalRegistros = 20;
  listMovimentacoes:Movimentacao[] = [];
  ultimoLLE!:TableLazyLoadEvent;

  mmovimetacaoCS:MovimentacaoControlService = inject(MovimentacaoControlService)
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  confirmationService: ConfirmationService = inject(ConfirmationService);

  constructor(){
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params)

    let d = new Date(Number.parseInt(this.activatedRoute.snapshot.params['data']))
    console.log(d)

    if(this.mmovimetacaoCS.termoBusca != this.activatedRoute.snapshot.params['termoBusca']) {
      this.mmovimetacaoCS.termoBusca = this.activatedRoute.snapshot.params['termoBusca'];
    }
  }

  onLazyLoad(event: TableLazyLoadEvent){
    console.log(event)
    let fil:any=
    {
      dtMovimentacao:{
        value: new Date(Number.parseInt(this.activatedRoute.snapshot.params['data'])),
        matchMode:'=',
        operator:''
      },
    };

    // event.filters =fil
    this.ultimoLLE = event;
    this.mmovimetacaoCS.realizaBusca(event)
      .subscribe((list:Movimentacao[])=>{
      this.listMovimentacoes = list;
      console.log(list);
      this.totalRegistros += this.listMovimentacoes.length;
    });
  }

  onPage(event:TablePageEvent){
    this.rowsPage = event.rows;
  }

  firstChange(value:number){
  }

  confirmExcluir(item:Movimentacao,event:Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir o item ' + item.dtMovimentacao+' ?',
      header: 'Excluir',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Excluir",
      rejectLabel:"Cancelar",
      rejectButtonStyleClass:"p-button-text",
      acceptButtonStyleClass:"p-button-danger",
      accept: () => {
        this.mmovimetacaoCS.excluir(item,event,this)
      }
    });
  }

  reloadResultSearch():void{
    this.onLazyLoad(this.ultimoLLE);
  }

  protected readonly console = console;


  onLazyLoadEvent(event:TableLazyLoadEvent){
    console.log('onLazyLoadEvent')
    console.log(event)

    this.mmovimetacaoCS.realizaBusca(event)
      .subscribe((list:Movimentacao[])=>{
        this.listMovimentacoes = list;
        this.totalRegistros += this.listMovimentacoes.length;
      });
  }
}
