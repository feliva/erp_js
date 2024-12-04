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
        return this.http.get<Estado[]>(this.serverUrl + this.getPath() + "/listAllEstados");
    }

    public listAllByEstado(idEstado:number|undefined): Observable<Cidade[]> {
        return this.http.get<Cidade[]>(this.serverUrl + this.getPath() + "/listAllByEstado/"+idEstado);
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
}
