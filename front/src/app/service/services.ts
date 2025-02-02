import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {TableLazyLoadEvent} from "primeng/table";
import {CustomHttpClient} from "./CustomHttpClient";
import {Model} from "../model/Model";

export abstract class Services<T extends Model>{

  serverUrl:string = 'http://localhost:8080';
  static headersForm = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'content-type': 'application/json'
  });

  http = inject(CustomHttpClient);

  constructor(){
  }

  public abstract getPath():string;

  public find(url: string, obj: any = undefined): Observable<T[]> {
    if (obj == undefined) {
      return this.http.getAndMap(`${this.serverUrl}${this.getPath()}/${url}`, this.getEntityType());
    } else {
      return this.http.getAndMap(`${this.serverUrl}${this.getPath()}/${url}`, this.getEntityType());
    }
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

  public save(obj: T): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(
        `${this.serverUrl}${this.getPath()}`,
        JSON.stringify(obj),
        { headers }
    );
  }

  /**
   * criado para envio de array de dados por post
   * @param id
   */
  public saveArray(obj:T[]):Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.http.post(this.serverUrl + this.getPath(),JSON.stringify(obj),{'headers':headers});
    // .subscribe(result => console.log(result));
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.serverUrl}${this.getPath()}/${id}`);
  }

  public send(obj:any, url?:string): Observable<any>{
    url = (url === undefined?'':url);

    return this.http.post(this.serverUrl + this.getPath() + url,
      JSON.stringify(obj),
      {'headers':Services.headersForm}
    );
  }
  public listAll(): Observable<T[]> {
    return this.http.getAndMap(`${this.serverUrl}${this.getPath()}/listAll`, this.getEntityType());
  }

  public findById(id: number): Observable<T> {
    return this.http.getModel(`${this.serverUrl}${this.getPath()}/${id}`,this.getEntityType());
  }

  public listByFilter(event: TableLazyLoadEvent): Observable<T[]> {
    return this.send(event, '/listByFilter');
  }

  /**
   * retorna o typo que o service atende
   * uma implementação:
   *
   *   public getEntityType(): new () => Contato {
   *     return Contato;
   *   }
   */
  public abstract getEntityType(): new () => T;
  // public abstract getModel(url:string): Observable<T>;
}
