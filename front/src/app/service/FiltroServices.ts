import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {map, Observable, take} from "rxjs";
import {inject} from "@angular/core";
import {TableLazyLoadEvent} from "primeng/table";
import {Marca} from "../model/Marca";
import {Movimentacao} from "../model/Movimentacao";
import {FormGroup} from "@angular/forms";
import {Contato} from "../model/Contato";
import {Services} from "./services";

export abstract class FiltroServices<T> extends Services<T>{

  public abstract getFiltrosForm():FormGroup;
  public abstract limpaFiltros():void;

  public paginado(filtroForm:FormGroup, arrow:(value: T[]) => void): void{
    let param:string = "?"
    Object.keys(filtroForm.controls).forEach((key:string) => {
      const abstractControl = filtroForm.get(key);
      param = param + (key +"="+abstractControl?.value+"&");
    });

    this.http.get<T[]>(
        this.serverUrl + this.getPath() + "/paginado"+param
    ).subscribe(arrow);
  }

  public paginadoCount(): number {
    let retorno:number = 0;
    this.http.get<number>(this.serverUrl + this.getPath() + "/paginadoCount").subscribe((dado)=>{
      retorno = dado;
    });
    return retorno;
  }

  public paginado1(arrow:(value: T[]) => void): void{
    this.paginado(this.getFiltrosForm(),arrow);
  }

}
