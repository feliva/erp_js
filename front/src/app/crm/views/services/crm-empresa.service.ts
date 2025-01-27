import {Injectable} from '@angular/core';
import {Contato} from "../../../model/Contato";
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
    return "/back/crm/empresa";
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
