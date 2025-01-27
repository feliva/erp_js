import {Injectable} from '@angular/core';
import {Services} from "./services";
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

  constructor() {
    super();
  }

  public getEntityType(): new () => TipoMovimentacao {
    return TipoMovimentacao; // Retorna o tipo da entidade
  }

}
