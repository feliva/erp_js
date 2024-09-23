import {Unidade} from "./Unidade";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Fornecedor} from "./Fornecedor";

export class Armazenagem {
  idArmazen: number | undefined = undefined;
  nome:string| undefined = undefined;
  descricao:string|undefined = undefined;

  static createFormGroup():FormGroup {
    return new FormGroup({
      idArmazen: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }
}

