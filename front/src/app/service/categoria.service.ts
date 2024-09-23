import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Produto} from "../model/Produto";
import {TableLazyLoadEvent} from "primeng/table";
import {Categoria} from "../model/Categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends Services<Categoria> {

  public override getPath(): string {
    return "/back/categoria";
  }
  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  constructor() {
    super();
  }
  //
  // public findByNome(nome: string, paginacao: TableLazyLoadEvent): Observable<Categoria[]> {
  //   return this.send(paginacao, '/findByNome/' + nome);
  // }
  //
  // public findById(idCategoria: number): Observable<Categoria> {
  //   return this.getByUrl('/findById/' + idCategoria)
  // }

}
