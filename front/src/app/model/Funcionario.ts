import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Endereco} from "./Endereco";
import {Pessoa} from "./Pessoa";
import {Status} from "./Status";

export class Funcionario {
  idFuncionario?: number;
  pessoa?: Pessoa;
  endereco?: Endereco;
  dtContratacao ?:string;
  status?:Status


  static CreateFormGroup(entity?: Funcionario) {
    return new FormGroup({
      idFuncionario: new FormControl(entity?.idFuncionario),
      pessoa: Pessoa.CreateFormGroup(entity?.pessoa),
      endereco: Endereco.CreateFormGroup(entity?.endereco),
      dtContratacao: new FormControl(entity?.dtContratacao,[Validators.required]),

    });

  }
}