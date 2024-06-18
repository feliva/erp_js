import {Component, inject, Injectable, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router,RouterModule} from "@angular/router";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";

import {Produto} from "../model/Produto";
import {ProdutoService} from "../service/produto.service";
import {TableLazyLoadEvent} from "primeng/table";
import {AppComponent} from "../model/AppComponent";
import {AppMessageService} from "../service/app-message.service";
import {BreadCrumbMenuItem} from "../components/breadcrumb/BreadCrumbMenuItem.class";


@Injectable({
  providedIn:'root'
})
export class ProdutoControlService implements OnInit{

  termoBusca:string='';
  listProdutos:Produto[] = [];
  produto:Produto|undefined;

  produtoService:ProdutoService = inject(ProdutoService);
  appMessage:AppMessageService = inject(AppMessageService);
  breadservice:BreadcrumbService = inject(BreadcrumbService);
  router:Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);

  acessoDireto:boolean = true;

  constructor(){
    console.log("Produtocontroler construtor!!!!!!!!!!!!!!!!!!!!!!");
  }

  inicializaFluxoNormal(){
    this.acessoDireto = false;
  }


  activatedRouteRI:ActivatedRoute|undefined;

  public reInit(activatedRouteRI:ActivatedRoute){
    this.activatedRouteRI = activatedRouteRI;
  }

  public isNovo(){
    return (!!this.activatedRouteRI?.snapshot.data['ehNovo']);
  }

  public novoProduto(){
    this.toUrl('produto/novo');
  }


  buscar( termobusca:string|undefined = '*'){
    this.termoBusca = termobusca?.trim();

    if(this.termoBusca == undefined || this.termoBusca.trim() == ''){
      this.termoBusca = '*'
    }
    this.listar();
  }

  public listar(){
    this.toUrl('produto/listar/'+this.termoBusca);
  }

  telaBuscar(){
    this.toUrl('produto/buscar');
  }

  realizaBusca(event: TableLazyLoadEvent){
    console.log(this.termoBusca);
    return this.produtoService.findByNome(this.termoBusca, event);
  }

  public editar(produto:Produto,event:any){
    this.produto = produto;
    this.toUrl('produto/editar/'+this.produto.idProduto);

  }

  public excluir(produto:Produto,event:any,component:AppComponent){

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

  ngOnInit(): void {
    console.log("Produtocontroler init!!!!!!!!!!!!!!!!!!!!!!");
  }

  public toTelaInicial(){
    this.toUrl('/produto/buscar');
  }

  public toUrl(url:string){
    this.router.navigateByUrl(url);
  }

}
