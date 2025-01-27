import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable} from "rxjs";
import {Categoria} from "../model/Categoria";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends Services<Categoria> {
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
  public override getPath(): string {
    return "/back/categoria";
  }
  public converteToIntance(observable:Observable<any>):Observable<any>{
    return observable
  }  public converteToArrayIntance(observable:Observable<any>):Observable<any>{
    return observable
  }

  constructor() {
    super();
  }
  //
  // public findByNome(nome: string, paginacao: TableLazyLoadEvent): Observable<Categoria[]> {
  //   return this.send(paginacao, '/findByNome/' + nome);
  // }
  //
  // public findById(idCategoria: number): Observable<Categoria> {
  //   return this.getByUrl('/findById/' + idCategoria)
  // }

  public getEntityType(): new () => Categoria {
    return Categoria; // Retorna o tipo da entidade
  }

}
