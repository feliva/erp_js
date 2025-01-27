import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable} from "rxjs";
import {Armazenagem} from "../model/Armazenagem";

@Injectable({
  providedIn: 'root'
})
export class ArmazenagemService extends Services<Armazenagem>{

  public override getPath(): string {
    return "/back/armazenagem";
  }
  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  constructor() {
    super();
  }

  public getEntityType(): new () => Armazenagem {
    return Armazenagem; // Retorna o tipo da entidade
  }

}
