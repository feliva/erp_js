import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Endereco} from "./Endereco";

export class Contato {
  idContato?: number;
  nome?: string;
  email?: string;
  celular?: string;
  endereco?: Endereco;

  get label(){
    return `${this.idContato} - ${this.nome}`;
  }

  static CreateFormGroup(entity: Contato) {
    return new FormGroup({
      idContato: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('', [Validators.required]),
      endereco: Endereco.CreateFormGroup(entity.endereco)
    });
  }
}