import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Services<Usuario>{

  public override getPath(): string {
    return "/usuario";
  }

  constructor(private  httpClient:HttpClient) {
    super(httpClient);
  }

  // public listAll(){
  //   return this.httpClient.get<Usuario[]>(super.serverUrl);
  // }
  public findByName(name:string,arrow:(value: Usuario[]) => void):void{

     super.postForm(new HttpParams().append('nome',name),'/findByName',arrow);
  }

  public findById(idUsuario:number,arrow:(value: Usuario) => void):void{
    super.getOne('/findById/' + idUsuario,arrow)
  }

}
