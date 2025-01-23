import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cidade} from "./Cidade";

export class Endereco{
  idEndereco?: number;
  cep?: string;
  cidade?:Cidade
  bairro?:string
  logradouro?:string
  numero?:string
  complemento?:string;

  static CreateFormGroup(entity?:Endereco){
    return new FormGroup({
      idEndereco : new FormControl('', []),
      cep : new FormControl('', [Validators.required]),
      estado : new FormControl(entity?.cidade?.estado, [Validators.required]),
      cidade : new FormControl('', [Validators.required]),
      bairro : new FormControl('', [Validators.required]),
      logradouro : new FormControl('', [Validators.required]),
      numero : new FormControl('', [Validators.required]),
      complemento : new FormControl('', [Validators.required]),
    })
  }
}
