import {Component, inject, Injectable, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router,RouterModule} from "@angular/router";
import {BreadcrumbService} from "../../components/breadcrumb/breadcrumb.service";

import {ProdutoService} from "../../service/produto.service";
import {TableLazyLoadEvent} from "primeng/table";
import {OperacoesExcluir} from "../../model/OperacoesExcluir";
import {AppMessageService} from "../../service/app-message.service";
import {Movimentacao} from "../../model/Movimentacao";
import {Produto} from "../../model/Produto";
import {TipoMovimentacao} from "../../model/TipoMovimentacao";
import {BUILDER_MENU_MOVIMENTACAO} from "./movimentacao.routes";
import {MovimentacaoService} from "../../service/movimentacao.service";

@Injectable({
  providedIn:'root'
})
export class MovimentacaoControlService{

  termoBusca:string='';
  listaMovimentacao:Movimentacao[] = [];
  movimentacao!:Movimentacao;

  movimentacaoService:MovimentacaoService = inject(MovimentacaoService)
  appMessage:AppMessageService = inject(AppMessageService);
  breadservice:BreadcrumbService = inject(BreadcrumbService);
  router:Router = inject(Router);
  activatedRouteRI:ActivatedRoute|undefined;

  acessoDireto:boolean = true;

  constructor(){
  }

  inicializaFluxoNormal(){
    this.acessoDireto = false;
  }

  public reInit(activatedRouteRI:ActivatedRoute){
    this.activatedRouteRI = activatedRouteRI;
  }

  public isNovo(){
    console.log((!!this.activatedRouteRI?.snapshot.data['ehNovo']))
    return (!!this.activatedRouteRI?.snapshot.data['ehNovo']);
  }

  public novo(){
    this.toUrl('novo');
  }

  buscar( data:Date = new Date(), tipoMovimentacao:TipoMovimentacao){
    // this.termoBusca = termobusca?.trim();
    //
    // if(this.termoBusca == undefined || this.termoBusca.trim() == ''){
    //   this.termoBusca = '*'
    // }
    // this.listar();
  }

  realizaBusca(event: TableLazyLoadEvent){
    console.log(event)
    return this.movimentacaoService.listByFilter(event);
    // return this.movimentacaoService.listAll();
  }

  public editar(item:Movimentacao,event:any){
    this.movimentacao = item;
    this.toUrl('editar/'+this.movimentacao.idMovimentacao);
  }

  public excluir(item:Movimentacao,event:any,component:OperacoesExcluir<Movimentacao>){

    if(item.idMovimentacao == undefined){
      this.appMessage.addError('','Produto não cadastrado.');
      return;
    }

    return this.movimentacaoService.delete(item.idMovimentacao).subscribe(()=>{
      component.reloadResultSearch();
      this.appMessage.addSuccess('','Produto excluído com sucesso.')
    })
  }

  public onCancelaForm(){
    if(this.isNovo() || this.acessoDireto){
      this.toTelaInicial()
    }
    this.breadservice.pop()//retira form
    this.breadservice.toTop();//faz o click no ultimo link do breacrumb
  }

  public toTelaInicial(){
    this.toUrl('buscar');
  }
  public listar(){
    this.toUrl('listar/'+this.termoBusca);
  }

  telaBuscar(){
    this.toUrl('buscar');
  }

  public toUrl(url:string){
    this.router.navigateByUrl(BUILDER_MENU_MOVIMENTACAO.masterPath + url);
  }
}
