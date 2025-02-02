import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Model} from "../model/Model";

@Injectable({
    providedIn: 'root',
})
export class CustomHttpClient extends HttpClient {
    /**
     * Método genérico para realizar requisições GET e transformar os resultados
     * em instâncias de classes específicas.
     *
     * @param url URL da requisição
     * @param type Classe para a qual os objetos JSON serão transformados
     */
    getAndMap<T extends Model>(url: string, type: new () => T): Observable<T[]> {
        return super.get<T[]>(url).pipe(
            map((data: T[]) => data.map(item => Object.assign((new type()), item)))
        );
    }

    /**
     * Método para transformar um único objeto JSON em uma instância de classe.
     *
     * @param url URL da requisição
     * @param type Classe para a qual o objeto JSON será transformado
     */
    getSingle<T extends object >(url: string, type: new () => T): Observable<T> {
        return super.get<T>(url).pipe(
            map((data: T) => Object.assign(new type(), data))
        );
    }

    getListModel<T extends Model>(url: string, type: new (data?: any) => T): Observable<T[]> {
        return super.get<T[]>(url).pipe(
            map(dataArray => dataArray.map(item => new type(item)))
        );
    }

    getModel<T>(url: string, type: new (data: any) => T): Observable<T> {
        return super.get(url).pipe(
            map((json: any) => {
                return new type(json);
            })
        );
    }
}