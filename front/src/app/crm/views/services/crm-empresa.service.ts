import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Observable} from "rxjs";
import {Contato} from "../../../model/Contato";
import {Services} from "../../../service/services";
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";

@Injectable({
  providedIn: 'root'
})
export class CrmEmpresaService extends FiltroServices<Contato> {

  protected filtroForm:FormGroup = CrmEmpresaService.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = CrmEmpresaService.inicializaFiltro();
  }

  public override getPath(): string {
    return "/back/crm/empresas";
  }

  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  static inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

}
