import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";
import {TipoContatoEmpresa} from "../../../model/TipoContatoEmpresa";

@Injectable({
  providedIn: 'root'
})
export class CrmTipoContatoEmpresaService extends FiltroServices<TipoContatoEmpresa> {

  protected filtroForm:FormGroup = this.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = this.inicializaFiltro();
  }

  public override getPath(): string {
    return "/back/crm/tipoContatoEmpresa";
  }

  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  public inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

}
