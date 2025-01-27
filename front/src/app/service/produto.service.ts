import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable} from "rxjs";
import {Produto} from "../model/Produto";
import {TableLazyLoadEvent} from "primeng/table";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends Services<Produto>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }

  public override getPath(): string {
    return "/back/produto";
  }

  constructor() {
    super();
  }

  public findByIdOrName(termoBusca:string) :Observable<Produto[]>{
    return this.find('findByIdOrName/'+ termoBusca);
  }

  public getEntityType(): new () => Produto {
    return Produto; // Retorna o tipo da entidade
  }
  public findByNome(nome:string, paginacao:TableLazyLoadEvent ) : Observable<Produto[]>{
      return this.send(paginacao,'/findByNome/' + nome);
  }

}
