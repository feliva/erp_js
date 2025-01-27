import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Status} from "../model/Status";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class StatusService extends Services<Status>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
  public override getPath(): string {
    return "/back/status";
  }

  constructor() {
    super();
  }

  public getEntityType(): new () => Status {
    return Status; // Retorna o tipo da entidade
  }
}
