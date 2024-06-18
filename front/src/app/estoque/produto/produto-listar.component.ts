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
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import {ProdutoControlService} from "../../controllers/produto-control.service";
import { ConfirmationService, MessageService } from 'primeng/api';
import {AppComponent} from "../../model/AppComponent";

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
                <th>{{produto.valor}}</th>
                <th>
                  <p-button icon="pi pi-pencil" [rounded]="true" [text]="true"
                    (onClick)="this.produtoCS.editar(produto,$event)" ></p-button>
                  <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger "
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

  `]
})
export class ProdutoListarComponent implements OnInit,AppComponent{

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
      this.totalRegistros += this.listProdutos.length;
    });
  }

  onPage(event:TablePageEvent){
    console.log('onpage')
    console.log(event)
    this.rowsPage = event.rows;
  }

  firstChange(value:number){
    console.log('firstChange '+ value)
  }

  confirmExcluir(produto:Produto,event:Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que disso?',
      header: 'Exclusão de item',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Sim",
      rejectLabel:"Não",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.produtoCS.excluir(produto,event,this)
      }
    });
  }

  reloadResultSearch():void{
    this.onLazyLoad(this.ultimoLLE);
  }
}
