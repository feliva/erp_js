import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {map, Observable} from "rxjs";
import {Movimentacao} from "../model/Movimentacao";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Services<Usuario>{

  public override getPath(): string {
    return "/back/usuario";
  }
  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  public converteToIntance(observable:Observable<Usuario>){
    return observable
  }

  constructor() {
    super();
  }

  // public listAll(){
  //   return this.httpClient.get<Usuario[]>(super.serverUrl);
  // }
  public findByName(name:string,arrow:(value: Usuario[]) => void):void{

     super.postForm(new HttpParams().append('nome',name),'/findByName',arrow);
  }


}
