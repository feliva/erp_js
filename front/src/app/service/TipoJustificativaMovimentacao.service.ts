import {Injectable} from '@angular/core';
import {Services} from "./services";
import {TipoJustufucativaMovimentacao} from "../model/TipoJustufucativaMovimentacao";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TipoJstificativaMovimentacaoService extends Services<TipoJustufucativaMovimentacao>{

  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public override getPath(): string {
    return "/back/tipoJustificativaMovimentacao";
  }

  constructor() {
    super();
  }

  public getEntityType(): new () => TipoJustufucativaMovimentacao {
    return TipoJustufucativaMovimentacao; // Retorna o tipo da entidade
  }
}
