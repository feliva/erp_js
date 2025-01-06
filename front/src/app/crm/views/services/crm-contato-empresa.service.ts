import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Observable} from "rxjs";
import {Contato} from "../../../model/Contato";
import {Services} from "../../../service/services";
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";
import {ContatoEmpresa} from "../../../model/ContatoEmpresa";

@Injectable({
  providedIn: 'root'
})
export class CrmContatoEmpresaService extends FiltroServices<ContatoEmpresa> {

  protected filtroForm:FormGroup = CrmContatoEmpresaService.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = CrmContatoEmpresaService.inicializaFiltro();
  }

  public override getPath(): string {
    return "/back/crm/contato";
  }

  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  static inicializaFiltro():FormGroup{
    return new FormGroup({
      // nome: new FormControl(''),
    });
  }

}
