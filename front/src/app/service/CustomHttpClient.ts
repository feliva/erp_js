import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
    get<T>(url: string, type: new () => T): Observable<T[]> {
        return super.get<T[]>(url).pipe(
            map((data: T[]) => data.map(item => Object.assign(new type(), item)))
        );
    }

    /**
     * Método para transformar um único objeto JSON em uma instância de classe.
     *
     * @param url URL da requisição
     * @param type Classe para a qual o objeto JSON será transformado
     */
    getSingle<T>(url: string, type: new () => T): Observable<T> {
        return super.get<T>(url).pipe(
            map((data: T) => Object.assign(new type(), data))
        );
    }
}