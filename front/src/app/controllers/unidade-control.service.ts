import {Component, NgModule} from '@angular/core';
import {inject, Injectable} from '@angular/core';
import {ActivatedRoute, Router,RouterModule} from "@angular/router";
import {MessageService} from "primeng/api";
import {BreadcrumbService} from "../components/breadcrumb/breadcrumb.service";
import {UnidadeService} from "../service/unidade.service";
import {Observable} from "rxjs";
import {Unidade} from "../model/Unidade";
import {TipoBusca} from "../util/constantes.util";

@Injectable({
  providedIn: 'root'
})
export class UnidadeControlService {

  termoBusca:string='';
  unidades$?:Observable<Unidade[]>;

  unidadeService:UnidadeService = inject(UnidadeService);
  messageService:MessageService = inject(MessageService);
  breadservice:BreadcrumbService = inject(BreadcrumbService);
  router:Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute)

  constructor(){

    console.log(this.router)
  }

  buscar(){
    this.trazDados();
    this.router.navigateByUrl('unidade/listar/'+this.termoBusca);
  }

  private fazTermoBusca(){
    if(this.termoBusca == undefined || this.termoBusca.trim() == ''){
      this.termoBusca = '*'
    }
  }

  trazDados(){
    this.fazTermoBusca();
    if(this.termoBusca === '*'){
      this.unidades$ = this.unidadeService.listAll();
    }else{
      this.unidades$ = this.unidadeService.findByDescSigla(this.termoBusca);
    }
  }

  listar(){
    if(this.unidades$ != undefined){
      return;
    }

    this.termoBusca = this.activatedRoute.snapshot.firstChild?.params['termoBusca'];
    this.trazDados();
  }

  editar(unidade:Unidade){
    this.router.navigateByUrl('unidade/editar/' + unidade.idUnidade );
  }

  getTermoBusca(): string {
    return this.termoBusca;
  }

  setTermoBusca(value: string) {
    this.termoBusca = value;
  }
}
