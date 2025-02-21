import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable, of} from "rxjs";
import {Cidade, Estado} from "../model/Cidade";
import {HttpParams} from "@angular/common/http";
import {Resposta} from "../model/Resposta";

@Injectable({
    providedIn: 'root'
})
export class CidadeService extends Services<Cidade> {


    constructor() {
        super();
    }

    public autocomplete(query:string):Observable<Resposta<Cidade[]>>{
        return this.http.get<Resposta<Cidade[]>>(`${this.serverUrl}${this.getPath()}/autocomplete`, {
            params:new HttpParams().set("query", query)
        })
    }

    public override getPath(): string {
        return "/back/cidade";
    }

    public listAllEstados(): Observable<Estado[]> {
        return this.http.get<Estado[]>(this.serverUrl + this.getPath() + "/listAllEstados");
    }

    public listAllByEstado(idEstado: number | undefined): Observable<Cidade[]> {
        if (!idEstado) {
            return of([]);
        }
        return this.http.get<Cidade[]>(this.serverUrl + this.getPath() + "/listAllByEstado/" + idEstado);
    }

}
