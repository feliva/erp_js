import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Produto} from "../model/Produto";
import {TableLazyLoadEvent} from "primeng/table";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends Services<Produto>{

  public override getPath(): string {
    return "/back/produto";
  }

  constructor() {
    super();
  }

  // public listAll(){
  //   return this.httpClient.get<Usuario[]>(super.serverUrl);
  // }
  public findByNome(nome:string, paginacao:TableLazyLoadEvent ) : Observable<Produto[]>{
      return this.send(paginacao,'/findByNome/' + nome);
  }

  public findById(idProduto:number):Observable<Produto>{
    return this.getByUrl('/findById/' + idProduto)
  }

}
