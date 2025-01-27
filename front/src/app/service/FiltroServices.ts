import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {TableLazyLoadEvent} from "primeng/table";
import {Services} from "./services";

export abstract class FiltroServices<T extends object> extends Services<T> {

    public abstract getFiltrosForm(): FormGroup;

    public abstract limpaFiltros(): void;

    public tableLazyLoad(event:TableLazyLoadEvent): Observable<T[]> {
        return this.send(event,'/tableLazyLoad')
    }

    public tableLazyLoadCount(event:TableLazyLoadEvent): Observable<number> {
        return this.send(event,'/tableLazyLoadCount')
    }

    // getlazy(){
    //     let e:TableLazyLoadEvent = {filters: {
    //             nome:{value:"",operator:"or",matchMode:""},
    //             cpf:{}
    //         }
    //     };
    // }
}
