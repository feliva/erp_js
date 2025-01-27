import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends Services<Unidade>{

  public override getPath(): string {
    return "/back/unidade";
  }

  constructor() {
    super();
  }

  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public findByDescSigla(termoBuca:string){
      return this.find('findByDescriSigla/' + termoBuca);
  }

  public getEntityType(): new () => Unidade {
    return Unidade; // Retorna o tipo da entidade
  }
}
