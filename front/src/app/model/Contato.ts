import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Cidade} from "./Cidade";

export class Contato{
  idContato?: number;
  nome?: string;
  email?: string;
  celular?: string;
  cidade?: Cidade;
}
