import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {TableLazyLoadEvent} from "primeng/table";
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

    public tableLazyLoad(event:TableLazyLoadEvent): Observable<T[]> {
        return this.send(event,'/tableLazyLoad')
    }

    public tableLazyLoadCount(event:TableLazyLoadEvent): Observable<number> {
        return this.send(event,'/tableLazyLoadCount')
    }
}
