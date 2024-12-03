import {FormControl, FormGroup, Validators} from "@angular/forms";

export class Contato{
  idContato?: number | undefined;
  nome!: string;
  email!: string;
  celular!: string;


  static createFormGoup(contato: Contato): FormGroup {
    return new FormGroup({
      idContato: new FormControl(contato.idContato),
      nome:new FormControl(contato.nome, [Validators.required]),
      email:new FormControl(contato.email, [Validators.required,Validators.email]),
      celular:new FormControl(contato.celular, [Validators.required]),
    });
  }
}
