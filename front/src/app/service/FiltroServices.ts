import {FormControl} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, take} from "rxjs";
import {inject} from "@angular/core";
import {TableLazyLoadEvent, TablePageEvent} from "primeng/table";
import {Marca} from "../model/Marca";
import {Movimentacao} from "../model/Movimentacao";
import {FormGroup} from "@angular/forms";
import {Contato} from "../model/Contato";
import {Services} from "./services";

export abstract class FiltroServices<T> extends Services<T> {

    public abstract getFiltrosForm(): FormGroup;

    public abstract limpaFiltros(): void;

    public paginado(queryParam: string): Observable<T[]> {
        return this.http.get<T[]>(this.serverUrl + this.getPath() + "/paginado" + queryParam);
    }

    public paginadoCount(queryParam: string): Observable<number> {
        return this.http.get<number>(this.serverUrl + this.getPath() + "/paginadoCount" + queryParam)
    }
}
