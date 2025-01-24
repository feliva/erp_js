import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Contato} from "../../../model/Contato";
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";

@Injectable({
  providedIn: 'root'
})
export class CrmContatoService extends FiltroServices<Contato> {

  protected filtroForm:FormGroup = CrmContatoService.inicializaFiltro();

  constructor() {
    super();
  }

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public limpaFiltros():void{
    this.filtroForm = CrmContatoService.inicializaFiltro();
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

  public listByNome(param: string): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.serverUrl + this.getPath() + "/listByNome/"+param);
  }


  static inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

}
