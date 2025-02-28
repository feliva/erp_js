import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Model} from "./Model";

export class Pessoa extends Model{
  idPessoa?: number;
  nome?: string
  email?: string

  constructor(entity?: Partial<Pessoa>) {
    super(entity);
  }

  get label(){
    return `${this.idPessoa} - ${this.nome}`;
  }

  getMMId(){
    return this.idPessoa;
  }

  static CreateFormGroup(entity?: Pessoa) {
    return new FormGroup({
      idPessoa: new FormControl(entity?.idPessoa),
      nome: new FormControl(entity?.nome, [Validators.required]),
      email: new FormControl(entity?.email, [Validators.required, Validators.email]),
    });
  }
}