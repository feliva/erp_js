import {FormControl, FormGroup} from "@angular/forms";
import {Endereco} from "./Endereco";
import {Pessoa} from "./Pessoa";
import {Status} from "./Status";

export class Funcionario {
  idFuncionario?: number;
  pessoa?: Pessoa;
  endereco?: Endereco;
  status?:Status


  static CreateFormGroup(entity?: Funcionario) {
    return new FormGroup({
      idFuncionario: new FormControl(entity?.idFuncionario),
      endereco: Endereco.CreateFormGroup(entity?.endereco),

    });
  }
}