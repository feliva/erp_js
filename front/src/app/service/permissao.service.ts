import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Services} from './services';
import {Permissao} from '../model/Permissao';
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends Services<Permissao>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
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
