import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Status} from "../model/Status";
import {TipoMovimentacao} from "../model/TipoMovimentacao";

@Injectable({
  providedIn: 'root'
})
export class TipoMovimentacaoService extends Services<TipoMovimentacao>{

  public override getPath(): string {
    return "/back/tipo_movimentacao";
  }


  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  constructor() {
    super();
  }

}
