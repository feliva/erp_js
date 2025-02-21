import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {TableLazyLoadEvent} from "primeng/table";
import {Services} from "./services";
import {FormFilter} from "../model/FormFilter";

export abstract class FiltroServices<T> extends Services<T> {

    public abstract getFiltrosForm(): FormGroup;

    public abstract limpaFiltros(): void;

    public tableLazyLoad(event:TableLazyLoadEvent): Observable<T[]> {
        return this.send(event,'/tableLazyLoad')
    }

    public tableLazyLoadCount(event:TableLazyLoadEvent): Observable<number> {
        return this.send(event,'/tableLazyLoadCount')
    }

    public formFilter(event:FormFilter):Observable<T[]>{
        return this.http.post<T[]>(this.serverUrl + this.getPath() +  '/formFilter',
            JSON.stringify(event),
            {'headers':Services.headersForm}
        );
    }
}
