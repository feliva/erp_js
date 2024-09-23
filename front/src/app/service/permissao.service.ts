import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Services} from './services';
import {Permissao} from '../model/Permissao';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends Services<Permissao>{

  constructor() {
    super();
   }
  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  public override getPath(): string {
    return '/auth/permissao';
  }

}
