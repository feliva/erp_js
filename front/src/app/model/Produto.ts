import {Unidade} from "./Unidade";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export class Produto{
  idProduto: number | undefined = undefined;
  nome:string| undefined = undefined;
  valorVenda:number = 0;
  Valor:number = 0;
  unidade:Unidade | undefined = undefined;

  static createFormGoup() {
    return new FormGroup({
      idProduto: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      valorVenda: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
      unidade: new FormControl('', [Validators.required]),
    });
  }
}

