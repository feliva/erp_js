import {Component, inject, Injectable, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router,RouterModule} from "@angular/router";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";

import {Produto} from "../model/Produto";
import {ProdutoService} from "../service/produto.service";
import {TableLazyLoadEvent} from "primeng/table";
import {OperacoesExcluir} from "../model/OperacoesExcluir";
import {AppMessageService} from "../service/app-message.service";

@Injectable({
  providedIn:'root'
})
export class ProdutoControlService{

  termoBusca:string='';
  listProdutos:Produto[] = [];
  produto:Produto|undefined;

  produtoService:ProdutoService = inject(ProdutoService);
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
    return (!!this.activatedRouteRI?.snapshot.data['ehNovo']);
  }

  public novoProduto(){
    this.toUrl('estoque/produto/novo');
  }

  buscar( termobusca:string|undefined = '*'){
    this.termoBusca = termobusca?.trim();

    if(this.termoBusca == undefined || this.termoBusca.trim() == ''){
      this.termoBusca = '*'
    }
    this.listar();
  }

  realizaBusca(event: TableLazyLoadEvent){
    return this.produtoService.findByNome(this.termoBusca, event);
  }

  public editar(produto:Produto,event:any){
    this.produto = produto;
    this.toUrl('estoque/produto/editar/'+this.produto.idProduto);
  }

  public excluir(produto:Produto,event:any,component:OperacoesExcluir<Produto>){

    if(produto.idProduto == undefined){
      this.appMessage.addError('','Produto não cadastrado.');
      return;
    }

    return this.produtoService.delete(produto.idProduto).subscribe(()=>{
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
    this.toUrl('estoque/produto/buscar');
  }
  public listar(){
    this.toUrl('estoque/produto/listar/'+this.termoBusca);
  }

  telaBuscar(){
    this.toUrl('estoque/produto/buscar');
  }

  public toUrl(url:string){
    this.router.navigateByUrl(url);
  }
}
