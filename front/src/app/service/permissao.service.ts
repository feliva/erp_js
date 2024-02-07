import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Services} from './services';
import {Permissao} from '../model/Permissao';

@Injectable({
  providedIn: 'root'
})
export class PermissaoService extends Services<Permissao>{

  constructor(private httpClient:HttpClient) {
    super(httpClient);
   }


  public override getPath(): string {
    return '/permissao';
  }

}
