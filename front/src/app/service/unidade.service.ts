import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";

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

  // public listAll(){
  //   return this.httpClient.get<Usuario[]>(super.serverUrl);
  // }
  public findByDescSigla(termoBuca:string){
      return this.find('findByDescriSigla/' + termoBuca);
  }

  public findById(idUnidade:number):Observable<Unidade>{
    return this.getByUrl('/findById/' + idUnidade)
  }

}
