import {Unidade} from "./Unidade";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Fornecedor} from "./Fornecedor";

export class Marca{
  idMarca: number | undefined = undefined;
  nome:string| undefined = undefined;
  fornecedo:Fornecedor|undefined = undefined;

  static createFormGoup() {
    return new FormGroup({
      idMarca: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      fornecedo: new FormControl('', [Validators.required]),
    });
  }
}

