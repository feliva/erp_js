import {FormControl, FormGroup, Validators} from "@angular/forms";

export class Fornecedor{
  idFornecedor: number | undefined = undefined;
  nome:string| undefined = undefined;


  static createFormGoup() {
    return new FormGroup({
      idFornecedor: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
    });
  }
}

