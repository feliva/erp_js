import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Marca} from "../model/Marca";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends Services<Marca> {
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public override getPath(): string {
    return "/back/marca";
  }

  constructor() {
    super();
  }

  public getEntityType(): new () => Marca {
    return Marca; // Retorna o tipo da entidade
  }

}
