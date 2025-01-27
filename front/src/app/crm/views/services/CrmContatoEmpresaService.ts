import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FiltroServices} from "../../../service/FiltroServices";
import {ContatoEmpresa} from "../../../model/ContatoEmpresa";

@Injectable({
  providedIn: 'root'
})
export class CrmContatoEmpresaService extends FiltroServices<ContatoEmpresa> {

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
    return "/back/crm/contatoEmpresa";
  }

  public inicializaFiltro():FormGroup{
    return new FormGroup({
      nome: new FormControl(''),
    });
  }

  getEntityType(): { new(): ContatoEmpresa } {
    return ContatoEmpresa;
  }

}
