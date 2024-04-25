import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Services} from './services';
import {Permissao} from '../model/Permissao';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends Services<Permissao>{

  constructor() {
    super();
   }


  public override getPath(): string {
    return '/auth/permissao';
  }

}
