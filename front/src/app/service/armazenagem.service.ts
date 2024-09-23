import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Status} from "../model/Status";
import {TipoMovimentacao} from "../model/TipoMovimentacao";
import {Armazenagem} from "../model/Armazenagem";

@Injectable({
  providedIn: 'root'
})
export class ArmazenagemService extends Services<Armazenagem>{

  public override getPath(): string {
    return "/back/armazenagem";
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
