import {FormControl, FormGroup, Validators} from "@angular/forms";

export class Categoria{
  idCategoria: number | undefined = undefined;
  nome:string| undefined = undefined;
  descricao:string|undefined = undefined;

  static createFormGoup() {
    return new FormGroup({
      idCategoria: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }
}

