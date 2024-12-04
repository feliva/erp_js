import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {map, Observable, take} from "rxjs";
import {inject} from "@angular/core";
import {TableLazyLoadEvent} from "primeng/table";
import {Marca} from "../model/Marca";
import {Movimentacao} from "../model/Movimentacao";
import {FormGroup} from "@angular/forms";
import {Contato} from "../model/Contato";

export abstract class Services<T>{

  serverUrl:string = 'http://localhost:8080';
  http = inject(HttpClient)
  static headersForm = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'content-type': 'application/json'
  });

  constructor(){
  }

  public abstract getPath():string;

  public abstract converteToArrayIntance(observable:Observable<T[]>):Observable<T[]>;
  public abstract converteToIntance(observable:Observable<T>):Observable<T>;

  public listAll(): Observable<T[]>{
    return this.http.get<T[]>(this.serverUrl + this.getPath() + "/listAll");
  }

  // public find(url:string): Observable<T[]>{
  //   return this.http.get<T[]>(this.serverUrl + this.getPath() + '/' + url);
  // }

  public find(url:string,obj:any = undefined ): Observable<T[]>{
    console.log('teste')
    console.log(JSON.stringify(obj));
    if(obj == undefined){
      return this.http.get<T[]>(this.serverUrl + this.getPath() + '/' + url);
    }else {
      return this.http.get<T[]>(this.serverUrl + this.getPath() + '/' + url);
    }
  }

  public raw(url:string,obj:any = undefined ): Observable<any>{
    if(obj == undefined){
      return this.http.get<any>(this.serverUrl + this.getPath() + '/' + url);
    }else {
      return this.http.get<any>(this.serverUrl + this.getPath() + '/' + url);
    }
  }

  public dataListAll(arrow:(value: T[]) => void):void{
    this.listAll().subscribe(arrow);
  }

  public getByUrl(url:string): Observable<T>{
    return this.http.get<T>(this.serverUrl + this.getPath() + url);
  }

  /**
   * Metodo usado para enviar dados como se fosse em um form pelo method post
   *
   * @param param tipo HttpParams, nome=oi&nome2=oi2
   * @param url
   * @param arrow function que é executada com o retorno
   */
  public postForm(param:HttpParams, url:string, arrow:(value: T[]) => void): void{
    this.http.post<T[]>(
        this.serverUrl + this.getPath() + url,
        param.toString(),
        {'headers':Services.headersForm}
    ).subscribe(arrow);
  }

  public save(obj:T):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.serverUrl + this.getPath(),JSON.stringify(obj),{'headers':headers});
    // .subscribe(result => console.log(result));
  }

  /**
   * criado para envio de array de dados por post
   * @param obj
   */
  public saveArray(obj:T[]):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.serverUrl + this.getPath(),JSON.stringify(obj),{'headers':headers});
    // .subscribe(result => console.log(result));
  }

  public delete(id:number): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.http.delete(this.serverUrl + this.getPath() +"/"+ id);//,{'headers':headers});
  }

  public send(obj:any, url?:string): Observable<any>{
    url = (url === undefined?'':url);

    return this.http.post(this.serverUrl + this.getPath() + url,
      JSON.stringify(obj),
      {'headers':Services.headersForm}
    );
  }

  //TODO remover esse metodo e criar um generico sem o parametro nome
  public findByNome(nome: string, paginacao: TableLazyLoadEvent): Observable<T[]> {
    return this.send(paginacao, '/findByNome/' + nome);
  }

  public listByFilter(event: TableLazyLoadEvent): Observable<T[]> {
    return this.send(event, '/listByFilter');
  }

  public findById(id: number): Observable<T> {
    return this.converteToIntance(this.getByUrl('/' + id));
  }

}
