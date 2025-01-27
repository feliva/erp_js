import {Injectable} from '@angular/core';
import {Services} from "./services";
import {Observable, of} from "rxjs";
import {Movimentacao} from "../model/Movimentacao";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService extends Services<Movimentacao>{
  protected filtroForm:FormGroup = new FormGroup({
    nome: new FormControl(''),
  });

  public getFiltrosForm():FormGroup{
    return this.filtroForm
  }
  public override getPath(): string {
    return "/back/movimentacao";
  }

  constructor() {
    super();
  }

  public getEstoqueProduto(idProduto:number) :Observable<number>{
    return of();//this.raw('getEstoqueProduto/'+ idProduto);
  }

  getEntityType(): { new(): Movimentacao } {
    return Movimentacao;
  }
}
