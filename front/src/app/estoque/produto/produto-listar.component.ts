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
import { ConfirmationService, MessageService, SharedModule } from 'primeng/api';
import {OperacoesExcluir} from "../../model/OperacoesExcluir";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'produto-busca',
    template: `
    <div >
      <p-panel header="Lista de Produto" id="pnlListarProduto" >
        <div >
          <p-table  [value]="listProdutos"  [tableStyle]="{'min-width': '60rem'}"
            [lazy]="true" dataKey="idProduto"
                   [paginator]="true"
                   [rows]="rowsPage"
                   [totalRecords]="totalRegistros"
                   (onLazyLoad)="onLazyLoad($event)"
                   (onPage)="onPage($event)"
                   (firstChange)="firstChange($event)"
                   [rowsPerPageOptions]="[20,40,80,160]"
                   >
            <ng-template pTemplate="header">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>V. Custo</th>
                <th>V. Venda</th>
                <th></th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-produto>
              <tr>
                <th>{{produto.idProduto}}</th>
                <th>{{produto.nome}}</th>
                <th>{{produto.valorVenda}}</th>
                <th>{{produto.status.descricao}}</th>
                <th>
                  <p-button icon="pi pi-pencil" [rounded]="true" [text]="true"
                    (onClick)="this.produtoCS.editar(produto,$event)" ></p-button>
                  <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger"
                    (onClick)="this.confirmExcluir(produto,$event)"></p-button>
                </th>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </p-panel>
      <p-confirmDialog />
    </div>
  `,
    styles: [`

  `],
    imports: [PanelModule, TableModule, SharedModule, ButtonModule, ConfirmDialogModule]
})
export class ProdutoListarComponent implements OnInit,OperacoesExcluir<Produto>{

  rowsPage = 20;
  totalRegistros = 20;
  listProdutos:Produto[] = [];
  ultimoLLE:TableLazyLoadEvent = {};

  produtoCS:ProdutoControlService = inject(ProdutoControlService);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)
  confirmationService: ConfirmationService = inject(ConfirmationService);

  constructor(){
  }

  ngOnInit() {
    if(this.produtoCS.termoBusca != this.activatedRoute.snapshot.params['termoBusca']) {
      this.produtoCS.termoBusca = this.activatedRoute.snapshot.params['termoBusca'];
    }
  }

  onLazyLoad(event: TableLazyLoadEvent){
    this.ultimoLLE = event;
    this.produtoCS.realizaBusca(event).subscribe((list:Produto[])=>{
      this.listProdutos = list;
      console.log(list);
      this.totalRegistros += this.listProdutos.length;
    });
  }

  onPage(event:TablePageEvent){
    this.rowsPage = event.rows;
  }

  firstChange(value:number){
  }

  confirmExcluir(produto:Produto,event:Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir o produto ' + produto.nome+' ?',
      header: 'Excluir',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:"Excluir",
      rejectLabel:"Cancelar",
      rejectButtonStyleClass:"p-button-text",
      acceptButtonStyleClass:"p-button-danger",
      accept: () => {
        this.produtoCS.excluir(produto,event,this)
      }
    });
  }

  reloadResultSearch():void{
    this.onLazyLoad(this.ultimoLLE);
  }
}
