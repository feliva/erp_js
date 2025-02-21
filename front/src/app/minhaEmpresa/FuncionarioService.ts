import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {Contato} from "../model/Contato";
import {FiltroServices} from "../service/FiltroServices";
import {CrmContatoService} from "../crm/views/services/crm-contato.service";
import {Funcionario} from "../model/Funcionario";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends FiltroServices<Funcionario> {

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
    return "/back/funcionarios";
  }

  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  public listByNome(param: string): Observable<Funcionario[]> {
    return this.http.get<Contato[]>(this.serverUrl + this.getPath() + "/listByNome/"+param);
  }


  static inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

  public getEntityType(): new () => Contato {
    return Contato; // Retorna o tipo da entidade
  }

}
