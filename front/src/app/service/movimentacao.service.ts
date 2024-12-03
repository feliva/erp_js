import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {map, Observable} from "rxjs";
import {Produto} from "../model/Produto";
import {TableLazyLoadEvent} from "primeng/table";
import {Movimentacao} from "../model/Movimentacao";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends Services<Movimentacao>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
  public override getPath(): string {
    return "/back/movimentacao";
  }

  converteToArrayIntance(Observable:Observable<Movimentacao[]>){
    return Observable.pipe(
      map((teste:Movimentacao[])=>{
        const mc:Movimentacao[] = []
        teste.forEach((item:Movimentacao)=>{
          mc.push(Movimentacao.converteToInstance(item))
        })
        return mc;
      })
    )
  }

  converteToIntance(Observable:Observable<Movimentacao>){
    return Observable.pipe(
      map((teste:Movimentacao)=>{
        return Movimentacao.converteToInstance(teste)
      })
    )
  }

  constructor() {
    super();
  }

  public getEstoqueProduto(idProduto:number) :Observable<number>{
    return this.raw('getEstoqueProduto/'+ idProduto);
  }

  // public findByNome(nome:string, paginacao:TableLazyLoadEvent ) : Observable<Produto[]>{
  //     return this.send(paginacao,'/findByNome/' + nome);
  // }
  //
  // public findById(idProduto:number):Observable<Produto>{
  //   return this.getByUrl('/findById/' + idProduto)
  // }

}
