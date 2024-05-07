import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, take} from "rxjs";
import {inject} from "@angular/core";

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


  public listAll(): Observable<T[]>{
    return this.http.get<T[]>(this.serverUrl + this.getPath() + "/listAll");
  }

  public find(url:string): Observable<T[]>{
    return this.http.get<T[]>(this.serverUrl + this.getPath() + '/' + url);
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

  public save(obj:T): void{
    const headers = { 'content-type': 'application/json'}
    console.log(JSON.stringify(obj));
    this.http.post(this.serverUrl + this.getPath(),JSON.stringify(obj),{'headers':headers}).subscribe(result => console.log(result));
  }

  public send(obj:T, url?:string): Observable<any>{
    url = (url === undefined?'':url);

    return this.http.post(this.serverUrl + this.getPath() + url,
      JSON.stringify(obj),
      {'headers':Services.headersForm}
    );
  }

}
