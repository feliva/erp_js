import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable, of} from "rxjs";
import {Cidade, Estado} from "../model/Cidade";

@Injectable({
    providedIn: 'root'
})
export class CidadeService extends Services<Cidade> {

    public override getPath(): string {
        return "/back/cidade";
    }

    public listAllEstados(): Observable<Estado[]> {
        return this.http.getAndMap<Estado>(this.serverUrl + this.getPath() + "/listAllEstados", Cidade);
    }

    public listAllByEstado(idEstado: number | undefined): Observable<Cidade[]> {
        if (!idEstado) {
            return of([]);
        }
        return this.http.getAndMap<Cidade>(this.serverUrl + this.getPath() + "/listAllByEstado/" + idEstado, Cidade);
    }

    public converteToIntance(observable: Observable<any>): Observable<any> {
        return observable
    }

    public converteToArrayIntance(observable: Observable<any>): Observable<any> {
        return observable
    }

    constructor() {
        super();
    }

    public getEntityType(): new () => Cidade {
        return Cidade; // Retorna o tipo da entidade
    }

}
