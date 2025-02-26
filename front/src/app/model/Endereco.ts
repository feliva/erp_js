import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cidade} from "./Cidade";
import {Model} from "./Model";

export class Endereco extends Model{
  idEndereco?: number;
  cep?: string;
  cidade?:Cidade
  bairro?:string
  logradouro?:string
  numero?:string
  complemento?:string;

  constructor(entity?: Partial<Endereco>) {
    super(entity);
  }


  static CreateFormGroup(entity?:Endereco){
    console.log(entity?.cidade)
    return new FormGroup({
      idEndereco : new FormControl(entity?.idEndereco, []),
      cep : new FormControl(entity?.cep, [Validators.required]),
      estado : new FormControl(entity?.cidade?.estado, [Validators.required]),
      cidade : new FormControl(entity?.cidade, [Validators.required]),
      bairro : new FormControl(entity?.bairro, [Validators.required]),
      logradouro : new FormControl(entity?.logradouro, [Validators.required]),
      numero : new FormControl(entity?.numero, [Validators.required]),
      complemento : new FormControl(entity?.complemento, [Validators.required]),
    })
  }
}
