import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

export abstract class Services<T>{

  serverUrl:string = 'http://localhost:8081';
  http!:HttpClient;
  static headersForm = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });

  constructor( http:HttpClient){
    this.http = http;
  }

  public abstract getPath():string;


  public listAll(): Observable<T[]>{
    return this.http.get<T[]>(this.serverUrl + this.getPath() + "/listAll");
  }

  public listAlla(arrow:(value: T[]) => void):void{
    this.http.get<T[]>(this.serverUrl + this.getPath() + "/listAll").subscribe(arrow);
  }

  public getOne(url:string,arrow:(value: T) => void):void{
    this.http.get<T>(this.serverUrl + this.getPath() + url).subscribe(arrow);
  }

  /**
   * Metodo usado para enviar dados como se fosse em um form pelo method post
   *
   * @param param tipo HttpParams, nome=oi&nome2=oi2
   * @param url
   * @param arrow function que é executada com o retorno
   */
  public postForm(param:HttpParams, url:string, arrow:(value: T[]) => void): void{
    this.http.post<T[]>(this.serverUrl + this.getPath() + url, param.toString(),{'headers':Services.headersForm}).subscribe(arrow);
  }

  public save(obj:T): void{
    const headers = { 'content-type': 'application/json'}
    console.log(JSON.stringify(obj));
    this.http.post(this.serverUrl + this.getPath(),JSON.stringify(obj),{'headers':headers}).subscribe(result => console.log(result));
  }

}
