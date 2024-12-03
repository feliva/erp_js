import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Status} from "../model/Status";
import {TipoMovimentacao} from "../model/TipoMovimentacao";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TipoMovimentacaoService extends Services<TipoMovimentacao>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
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
