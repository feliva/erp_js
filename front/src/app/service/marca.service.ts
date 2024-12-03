import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Usuario} from "../model/Usuario";
import {Services} from "./services";
import {Unidade} from "../model/Unidade";
import {Observable} from "rxjs";
import {Produto} from "../model/Produto";
import {TableLazyLoadEvent} from "primeng/table";
import {Categoria} from "../model/Categoria";
import {Marca} from "../model/Marca";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends Services<Marca> {
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
  public override getPath(): string {
    return "/back/marca";
  }
  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }
  constructor() {
    super();
  }

}
