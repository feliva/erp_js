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
}
